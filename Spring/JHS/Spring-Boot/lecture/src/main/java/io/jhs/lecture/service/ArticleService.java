package io.jhs.lecture.service;

import java.util.List;
import java.util.Map;

import io.jhs.lecture.dto.Article;

public interface ArticleService {
    List<Article> getArticles();

	Map<String, Object> write(Map<String, Object> param);

	Article getArticle(int id);

	Map<String, Object> delete(int id);

	Map<String, Object> modify(Map<String, Object> param);
}
