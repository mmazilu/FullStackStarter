package com.fullstackstarter.java.example.auth;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

@Component
public class MyAuthenticationFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, final FilterChain chain) throws IOException, ServletException {
        HttpServletRequest hreq = (HttpServletRequest) req;
        final Boolean loggedIn = (Boolean) hreq.getSession().getAttribute("loggedIn");
        if (loggedIn != null && loggedIn) {
            chain.doFilter(req, res);
        } else {
            ((HttpServletResponse)res).sendError(HttpStatus.UNAUTHORIZED.value(), "Please log in");
        }
    }
}

