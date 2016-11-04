package com.fullstackstarter.java.example.service;

import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.fullstackstarter.java.example.auth.exception.CredentialsInvalidException;
import com.fullstackstarter.java.example.model.UserTO;
import com.fullstackstarter.java.example.repository.User;
import com.fullstackstarter.java.example.repository.UserRepository;

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
//            final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password, AuthorityUtils.createAuthorityList("ROLE_USER"));
//            token.setDetails(new WebAuthenticationDetails(request));
//            Authentication authentication = authenticationManager.authenticate(token);
//            LOG.info("Logging in with [{}]", authentication.getPrincipal());
//            SecurityContextHolder.getContext().setAuthentication(authentication);
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

    public UserTO getUserByUsername(String username){
        final User byUsername = userRepository.findByUsername(username);
        return (byUsername != null) ? UserTO.from(byUsername) : null;
    }

    public User getByUsernameAndPassword(String username, String password){
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public List<UserTO> getUsers(){
        return userRepository.findAll().stream().map(UserTO::from).collect(Collectors.toList());
    }

    public UserTO saveUser(UserTO userTO){
        User user = new User();
        user.setName(userTO.getName());
        user.setUsername(userTO.getUsername());
        user.setPassword(userTO.getPassword());

        final User savedUser = userRepository.save(user);

        return UserTO.from(savedUser);
    }
}
