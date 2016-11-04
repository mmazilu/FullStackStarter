package com.fullstackstarter.java.example.service;

import com.fullstackstarter.java.example.auth.exception.CredentialsInvalidException;
import com.fullstackstarter.java.example.repository.User;
import com.fullstackstarter.java.example.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public User login(String username, String password, HttpServletRequest request) throws CredentialsInvalidException {
        if(StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
            throw new CredentialsInvalidException("Missing user or password");
        }

        User user = getByUsernameAndPassword(username, password);

        if (user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("loggedIn", true);
            session.setAttribute("username", username);
            return user;
        }

        throw new CredentialsInvalidException("Invalid Credentials");
    }

    public void logout(String username, HttpServletRequest request) {
        final HttpSession session = request.getSession();
        session.removeAttribute("loggedIn");
        session.removeAttribute("username");
    }

    public User getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User getByUsernameAndPassword(String username, String password){
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User saveUser(User user){
        user.set_id(null);
        final User savedUser = userRepository.save(user);
        return savedUser;
    }

    public User getUserById(String id) {
        return userRepository.findBy_id(id);
    }
}
