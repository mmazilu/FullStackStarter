package com.fullstackstarter.java.example.controller;

import com.fullstackstarter.java.example.repository.User;
import com.fullstackstarter.java.example.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/private")
public class UserController {
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public ResponseEntity<User> profile(HttpServletRequest request){
        final User userTO = userService.getUserByUsername((String)request.getSession().getAttribute("username"));
        return new ResponseEntity(userTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getUsers(HttpServletRequest request){
        final List<User> userTOs = userService.getUsers();
        return new ResponseEntity(userTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUser(@PathVariable String id,
            HttpServletRequest request){
        return new ResponseEntity(userService.getUserById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ResponseEntity logout(HttpServletRequest request) {
        userService.logout((String)request.getSession().getAttribute("username"), request);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralError(Exception exception) {
        exception.printStackTrace();
        return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
