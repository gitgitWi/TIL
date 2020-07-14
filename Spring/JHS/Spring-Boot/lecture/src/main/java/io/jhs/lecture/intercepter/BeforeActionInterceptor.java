package io.jhs.lecture.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component("beforeActionInterceptor")
public class BeforeActionInterceptor implements HandlerInterceptor {

    @Value("${custom.logoText}")
    String logoText;

    @Override
    public boolean preHandle (HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        request.setAttribute("logoText", logoText);

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}