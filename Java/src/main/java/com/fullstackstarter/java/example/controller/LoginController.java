package com.fullstackstarter.java.example.controller;

import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fullstackstarter.java.example.model.UserTO;
import com.fullstackstarter.java.example.repository.User;
import com.fullstackstarter.java.example.service.UserService;

@RestController
@RequestMapping("/api")
public class LoginController {
    private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResponseEntity<User> login(@RequestParam(value = "username", required = false) String username,
                                        @RequestParam(value = "password", required = false) String password,
                                        HttpServletRequest request) {
        final User user = userService.login(username, password, request);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<UserTO> signUpUser(@RequestBody UserTO userTO){
        final UserTO saveUser = userService.saveUser(userTO);
        return new ResponseEntity(saveUser, HttpStatus.OK);
    }
}
