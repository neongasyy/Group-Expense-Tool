from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS so React (localhost:3000) can call Flask (localhost:5000)
CORS(app)

# Create a single database connection to Supabase Postgres

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_PUBLISHABLE_KEY")
)

""""
create new group with createdBy, group_name, createdAt, memberIds, description, category, currency
"""  
@app.route('/group/create', methods=['POST'])
def createGroup():   
     try:
          data = request.json
          print(data)
     
          result = supabase.table("group").insert(data).execute()

          if (result.data):
               return result.data

          return jsonify({"success": "Success"}), 201
     
     except Exception as e:
          return jsonify({"error creating group": str(e)}), 400

@app.route('/group/addUser/', methods=['POST'])
def addUser(current_user_id, target_user_id, group_id):
     """ 
     add user to the group with user_id and group_id. need to update the memberIds field in the group table 
     insert a group member entry in the group_members table. need user_id and group_id. both are PKs and FKs 
     need to handle authentication and duplication
     """

     try:
          current_user_id = request.args.get('current_user_id')
          group_id = request.args.get("group_id")
          ownerUserId = supabase.table("group").select("created_by").eq("group_id", group_id)

          if (current_user_id == ownerUserId):
               response = supabase.table("group_members").insert({"uid": target_user_id, "group_id": group_id}).execute()

               if(response.data):
                    return response.data
               
               return jsonify({"SUCCESS": "User added to the group",}), 201
          else:
               return jsonify({"message": "Only the group owner can add other group members!"}), 201
     except Exception as e:
          return jsonify({"error addding user": str(e)}), 400


@app.route('/group/delete_user', methods=['DELETE'])
def deleteUser():
     """
     delete user from the group with user_id and group_id
     """
     try:
          group_id = request.args.get("group_id")
          currUserId = request.args.get('currUserId')
          target_user_id = request.args.get('target_user_id')
          ownerUserId = supabase.table("group").select("created_by").eq("group_id", group_id)

          if (currUserId == ownerUserId):
               response = (supabase.table("group_members").delete().eq("uid", target_user_id).eq("group_id", group_id).execute())
               return jsonify({"message": "User deleted from the group", "id": target_user_id}), 201
          else:
               return jsonify({"message": "Only the group owner can delete other group members!"}), 201
     except:
          fail = f"User {target_user_id} has not been deleted from group {group_id} due to an error!"
          return fail


@app.route('/group/viewGroups/', methods=['GET'])
def viewGroups():
     """ 
     view all groups they belong to with basic information based on user_id
     """

     try:
          data = request.json
          print(data)
          print("Fetching groups for user_id:", data["created_by"])
          
          result = supabase.from_('group').select(
               'created_by, group_id, group_name, description, group_expenses(expense_id, group_id, created_by, amount)'
               ).eq("created_by", data["created_by"]).execute()
          print(result)
          
          if (result.data):
               return result.data
          
          return jsonify({"message": "Success"}), 200
     
     except Exception as e:
          return jsonify({"error creating group": str(e)}), 400


if __name__ == '__main__':
    # Start Flask development server
    app.run(debug=True)