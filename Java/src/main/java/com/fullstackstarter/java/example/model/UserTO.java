package com.fullstackstarter.java.example.model;

import com.fullstackstarter.java.example.repository.User;

public class UserTO {
    private String name;
    private String username;
    private String password;

    public UserTO() {
    }

    public UserTO(String name, String username, String password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public static UserTO from(User user) {
        if (user.equals(null)){
            return null;
        }
        return new UserTO(user.getName(), user.getUsername(), user.getPassword());
    }
}
