<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:set var="pageTitle" value="게시물 작성" />

<%@ include file="../part/head.jspf" %>

<script>
	function submitWriteForm(form) {
		form.title.value = form.title.value.trim();
		if (form.title.value.length == 0) {
			alert('제목을 입력해주세요.');
			form.title.focus();
			return false;
		}

		form.body.value = form.body.value.trim();
		if (form.body.value.length == 0) {
			alert('내용을 입력해주세요.');
			form.body.focus();
			return false;
		}
		
		form.submit();
	}
</script>

<div class="article-write-box con table-box">
		<form onsubmit="submitWriteForm(this); return false;" action="/article/doWrite" method="POST" class="table-box">
			<table>
				<colgroup>
					<col width="100" />
				</colgroup>
				<tbody>
					<tr>
						<th>제목</th>
						<td><input autocomplete="off" name="title"
							autofocus="autofocus" placeholder="제목을 입력해주세요." type="text" /></td>
					</tr>
					<tr>
						<th>내용</th>
						<td><textarea name="body" placeholder="내용을 입력해주세요."></textarea>
						</td>
					</tr>
					<tr>
						<th>작성</th>
						<td><input type="submit" value="작성" /> <input
							onclick="history.back();" type="button" value="취소" /></td>
					</tr>
				</tbody>
			</table>
		</form>
</div>

<%@ include file="../part/foot.jspf" %>