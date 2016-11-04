package com.fullstackstarter.java.example.auth.exception;


public class CredentialsInvalidException extends RuntimeException {
    public CredentialsInvalidException(String msg) {
        super(msg);
    }
}