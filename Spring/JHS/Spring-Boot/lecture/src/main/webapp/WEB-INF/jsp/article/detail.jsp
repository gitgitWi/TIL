<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>CUNI - 게시물 상세</title>
<style>
.con {
	width: 1000px;
	margin: 0 auto;
}
.article-detail-box>table {
	width: 100%;
	border-collapse: collapse;;
}
.article-detail-box>table th, .article-detail-box>table td {
	border: 1px solid black;
	padding: 20px;
}
</style>
</head>
<body>
	<h1>게시물 상세</h1>

	<div class="con menu-box">
		<a href="/article/list">글 리스트</a> <a href="/article/write">글쓰기</a>
	</div>

	<div class="con article-detail-box">
		<table>
			<colgroup>
				<col width="100" />
			</colgroup>
			<tbody>
				<tr>
					<th>제목</th>
					<td>${article.title}</td>
				</tr>
				<tr>
					<th>내용</th>
					<td>${article.bodyForPrint}</td>
				</tr>
			</tbody>
		</table>
	</div>
</body>
</html>