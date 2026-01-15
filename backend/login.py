from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import psycopg2
import os
from dotenv import load_dotenv
import json

from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# Create a single database connection to Supabase Postgres

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_PUBLISHABLE_KEY")
)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    passwordHash = data.get('passwordHash')

    response = supabase.table("user").select("*").eq("email", email).eq("passwordHash", passwordHash).execute()
    print(response)

    if not response.data:
        return jsonify({"error": "Invalid email or password"}), 401
    
    return jsonify(response.data[0])

@app.route('/create_account', methods=['POST'])
def create_account():
    try:
        email = request.args.get('email')
        passwordHash = request.args.get('passwordHash')
        fullName = request.args.get('fullName')

        response = (supabase.table("user").insert({"email": email, "passwordHash": passwordHash, "fullName": fullName}).execute())
        success = "Account created!"

        return jsonify({"success": success})
    
    except:
        fail = "Account has not been created due to an error!"
        return fail

@app.route('/change_password', methods=['PUT'])
def change_password():
    try:
        email = request.args.get('email')
        newPasswordHash = request.args.get('newPasswordHash')

        response = (supabase.table("user").update({"passwordHash": newPasswordHash}).eq("email", email).execute())
        success = "Password updated!"
        return jsonify({"success": success})
    
    except:
        fail = "Password has not been updated due to an error!"
        return fail

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    Fetches a single user's profile information by user ID.
    Used by the frontend dashboard.
    """
    cur = conn.cursor()
    cur.execute("SELECT id, email, full_name FROM users WHERE id=%s",(user_id,))
    user = cur.fetchone()
    if not user:
            return jsonify({"error": "User not found"}), 404

    return jsonify({
        "userId": user[0],
        "email": user[1],
        "fullName": user[2],
        "groups": user[3],
        "groupsOwned": user[4],
    })

@app.route('/group_expense/', methods = ['POST'])
def create_new_expense():
    """
    Creates a group expense
    """
    data = request.json
    created_by = data.get("user_id")
    group_id = data.get("group_id")
    amounts = data.get("amounts")
    expense_name = data.get("expense_name")

    total_amount = 0
    transaction_arr = []

    for line in amounts:
        amount = line['amount']
        sent_to = line['userId']
        total_amount += amount
        transaction_dict = {
                "amount": amount,
                "sent_to": sent_to,
        }
        transaction_arr.append(transaction_dict)



    insert_dict = {
        "created_by": created_by,
        "group_id": group_id,
        "expense_name": expense_name,
        "amount": total_amount,
    }

    #Insert the expense into the group expense table
    response = (
        supabase.table("group_expenses")
        .insert(insert_dict)
        .execute()
    )

    response_data = response.data[0]
    expense_id = response_data['expense_id']
    print(f"EXPENSE_ID:{expense_id}")

    #Insert each of the sub transactions in the expense
    for transaction in transaction_arr:
        transaction['expense_id'] = expense_id
        response = (supabase.table("expense_transaction")
                    .insert(transaction)
                    .execute()
        )



    return jsonify({
    })


@app.route('/group_expense/', methods = ['GET'])
def get_all_expense():

    response = (
        supabase.table("group_expenses")
                .select("*")
                .execute()
    )

    print(response.data)
    return jsonify(response.data)


@app.route('/group_expense/', methods = ['DELETE'])
def delete_expense():
    return jsonify({})
    pass

'''
@app.route('/group_expense/', methods = ['GET'])
def get_group_expense():
    data = request.json
    group_id = data['group_id']
    response = (
        supabase.table("group_expense")
        .select("* from group_expense
    )
'''

@app.route('/balance', methods=['POST'])
def get_balance_data():
    """
    Gets balance amounts owed to the user per group
    """
    uid = request.json.get("uid")

    balances = {}
    groups = supabase.table("group_members").select("group_id").eq("uid", uid).execute().data

    for group in groups:
        group_id = group["group_id"]
        group_details = supabase.table("group").select("*").eq("group_id", group_id).execute().data[0]
        group_members = supabase.table("group_members").select("uid").eq("group_id", group_id).execute().data
        group_details["members"] = {}

        for group_member in group_members:
            member_uid = group_member["uid"]
            member_details = supabase.table("user").select("*").eq("uid", member_uid).execute().data[0]
            amounts = supabase.table("group_expenses").select("amount").eq("group_id", group_id).eq("created_by", member_uid).execute().data
            member_details["amount"] = sum(amount["amount"] for amount in amounts)
            group_details["members"][member_uid] = member_details

        balances[group_id] = group_details

    return balances

if __name__ == '__main__':
    # Start Flask development server
    app.run(debug=True)
