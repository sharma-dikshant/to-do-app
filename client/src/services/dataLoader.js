import { redirect } from "react-router-dom";
import axios from "axios";

import { API_ROUTES } from "./api";
export async function loadUser() {
  try {
    throw Error("error");
  } catch (error) {
    throw redirect("/home");
  }
}

export async function loadAllTaskLists() {
  try {
    //TODO hard coded user id
    const userId = "687211c6b451258d5cc9b045";
    const response = await axios.get(
      API_ROUTES.TASK_LIST.ALL_LIST_OF_USER(userId)
    );
    return response.data.data || [];
  } catch (error) {
    console.log(error);
  }
}
