<template>
  <div class="user-list">
    <h1>User List</h1>
    <div class="card">
      <ul>
        <li v-for="user in userList.list" :key="user.id" class="user-item">
          {{ user.firstName }} {{ user.lastName }} - {{ user.email }}
          <div class="button-group">
            <button @click="editUser(user)" class="edit-button">Edit</button>
            <button @click="deleteUser(user.id)" class="delete-button">
              Delete
            </button>
          </div>
        </li>
      </ul>

      <form @submit.prevent="addOrUpdateUser" class="user-form">
        <label class="form-label">
          ID:
          <input type="text" v-model="newUser.id" placeholder="Enter ID" />
        </label>
        <label class="form-label">
          First Name:
          <input
            type="text"
            v-model="newUser.firstName"
            placeholder="Enter first name"
          />
        </label>
        <label class="form-label">
          Last Name:
          <input
            type="text"
            v-model="newUser.lastName"
            placeholder="Enter last name"
          />
        </label>
        <label class="form-label">
          Email:
          <input
            type="email"
            v-model="newUser.email"
            placeholder="Enter email"
          />
        </label>
        <div class="form-buttons">
          <button type="submit" class="submit-button">
            {{ isEditing ? "Update User" : "Add User" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { userList } from "../store/userList";
import { User, IUserData } from "../types";

export default defineComponent({
  name: "UserList",
  setup() {
    const newUser = ref<IUserData>({
      firstName: "",
      lastName: "",
      email: "",
      id: "",
    });
    const isEditing = ref(false);

    const addOrUpdateUser = () => {
      if (isEditing.value) {
        updateUser();
      } else {
        addUser();
      }
      resetForm();
    };

    const editUser = (user: User) => {
      newUser.value = { ...user };
      isEditing.value = true;
    };

    const deleteUser = (id: string) => {
      try {
        userList.deleteUser(id);
      } catch (error: any) {
        alert(error.message);
      }
    };

    const updateUser = () => {
      try {
        userList.editUser(newUser.value);
      } catch (error: any) {
        alert(error.message);
      }
    };

    const addUser = () => {
      try {
        userList.addUser(newUser.value);
      } catch (error: any) {
        alert(error.message);
      }
    };

    const resetForm = () => {
      newUser.value = {
        firstName: "",
        lastName: "",
        email: "",
        id: "",
      };
      isEditing.value = false;
    };

    return {
      userList,
      newUser,
      isEditing,
      addOrUpdateUser,
      editUser,
      deleteUser,
    };
  },
});
</script>

<style scoped>
input[type="text"],
input[type="email"] {
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.user-list {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}

.user-item {
  margin-bottom: 10px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

.user-form label {
  text-align: center;
  margin-bottom: 5px;
  width: 50%;
}

.card {
  width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-group {
  margin-left: 10px;
}

.delete-button {
  margin-left: 5px;
  padding: 5px 10px;
  background-color: #ff2f2c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  padding: 5px 10px;
  background-color: #3062f8;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

.user-form label {
  text-align: center;
  margin-bottom: 5px;
  width: 50%;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.submit-button {
  padding: 5px 10px;
  background-color: #61b530;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .card {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
