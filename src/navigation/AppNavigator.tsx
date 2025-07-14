import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../features/auth/store/auth.slice";
import AuthNavigator from "./AuthNavigator";
import { AppDispatch, RootState } from "../app/store";

const AppNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setToken("token"));
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
