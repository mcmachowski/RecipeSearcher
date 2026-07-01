import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// shared
import Home from "./shared/components/Home/Home";
import Navigation from "./shared/components/Navigation/Navigation";
import Footer from "./shared/components/Footer/Footer";
import PageNotFound from "./shared/components/PageNotFound404/PageNotFound";
import { AuthContext } from "./shared/context/auth-context";

// recipes
import Search from "./recipes/pages/Search";
import Recipes from "./recipes/pages/Recipes";
import Recipe from "./recipes/pages/Recipe";

// user
import SignIn from "./user/pages/SignIn";
import SignUp from "./user/pages/SignUp";
import Favorites from "./recipes/pages/Favorites";
import ProfilePage from "./user/pages/ProfilePage";
import EditProfile from "./user/pages/EditProfile";

// admin
import Admin from "./user/pages/Admin";
import AdminUsers from "./user/components/Admin/AdminUsers";
import AdminRecipes from "./user/components/Admin/AdminRecipes";
import AdminEditRecipe from "./user/components/Admin/AdminEditRecipe";
import AdminNewRecipe from "./user/components/Admin/AdminNewRecipe";
import SearchedRecipes from "./recipes/components/Recipes/SearchedRecipes";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const signIn = useCallback((uid, token, isAdmin, expirationDate) => {
    setToken(token);
    setIsAdmin(isAdmin);
    setUserId(uid);
    const expiration =
      expirationDate instanceof Date
        ? expirationDate
        : new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(expiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: expiration.toISOString(),
        isAdmin: isAdmin,
      })
    );
    setIsSignedIn(true);
  }, []);
  const signOut = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setIsSignedIn(false);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(signOut, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, signOut, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      signIn(
        storedData.userId,
        storedData.token,
        storedData.isAdmin,
        new Date(storedData.expiration)
      );
    }
  }, [signIn]);

  const routesWhenSignedIn = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/searched-recipes">
        <SearchedRecipes />
      </Route>

      <Route path="/recipes/:recipeId">
        <Recipe />
      </Route>

      <Route path="/recipes">
        <Recipes />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route path="/favorites/:userId/:recipeId">
        <Recipe />
      </Route>

      <Route path="/favorites/:userId">
        <Favorites />
      </Route>

      <Route path="/profile/:userId">
        <ProfilePage />
      </Route>

      <Route path="/edit-profile/:userId">
        <EditProfile />
      </Route>

      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );

  const routesForAdmin = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/searched-recipes">
        <SearchedRecipes />
      </Route>

      <Route path="/admin/users/:userId">
        <ProfilePage />
      </Route>

      <Route path="/admin/edit-recipe/:recipeId">
        <AdminEditRecipe />
      </Route>

      <Route path="/admin/users">
        <AdminUsers />
      </Route>

      <Route path="/admin/recipes/add-recipe">
        <AdminNewRecipe />
      </Route>

      <Route path="/admin/recipes">
        <AdminRecipes />
      </Route>

      <Route path="/admin">
        <Admin />
      </Route>

      <Route path="/recipes/:recipeId">
        <Recipe />
      </Route>

      <Route path="/recipes">
        <Recipes />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route path="/favorites/:userId/:recipeId">
        <Recipe />
      </Route>

      <Route path="/favorites/:userId">
        <Favorites />
      </Route>

      <Route path="/profile/:userId">
        <ProfilePage />
      </Route>

      <Route path="/edit-profile/:userId">
        <EditProfile />
      </Route>

      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );

  const routesWhenSignedOut = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/searched-recipes">
        <SearchedRecipes />
      </Route>

      <Route path="/recipes/:recipeId">
        <Recipe />
      </Route>

      <Route path="/recipes">
        <Recipes />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route path="/sign-in">
        <SignIn />
      </Route>

      <Route path="/sign-up">
        <SignUp />
      </Route>

      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: isSignedIn,
        token: token,
        userId: userId,
        isAdmin: isAdmin,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      <Router>
        <Navigation />
        {isSignedIn
          ? isAdmin
            ? routesForAdmin
            : routesWhenSignedIn
          : routesWhenSignedOut}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
