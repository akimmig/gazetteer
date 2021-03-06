<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="gaz" tagdir="/WEB-INF/tags/layout" %>
<%@ page contentType="text/html; charset=utf-8" session="false"%>

<!doctype html>
<html>
<head>
<title><s:message code="ui.changePassword" text="ui.changePassword" /> | iDAI.gazetteer</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-site-verification" content="axehIuQKDs9bKUYzUl7hj1IvFMePho1--MppShoNQWk" />
<link rel="icon" href="resources/ico/favicon.ico">
<link rel="apple-touch-icon" sizes="144x144" href="resources/ico/apple-touch-icon-144.png">
<link rel="apple-touch-icon" sizes="114x114" href="resources/ico/apple-touch-icon-114.png">
<link rel="apple-touch-icon" sizes="72x72" href="resources/ico/apple-touch-icon-72.png">
<link rel="apple-touch-icon" href="resources/ico/apple-touch-icon-57.png">
<link href="//arachne.uni-koeln.de/archaeostrap/assets/css/bootstrap.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-responsive.min.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome-ie7.css" rel="stylesheet">
<link href="resources/css/app.css" rel="stylesheet">
<script	src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>	
<script	src="//arachne.uni-koeln.de/archaeostrap/assets/js/bootstrap.js"></script>	
<script src='//maps.google.com/maps/api/js?key=${googleMapsApiKey}&amp;sensor=false&libraries=visualization'></script>
<script src="resources/js/custom.js"></script>
</head>
<body>

	<div class="archaeo-fixed-menu">
		<div class="gaz-container archaeo-fixed-menu-header">
			<div class="btn-group pull-right" style="margin-top:12px">
				<a href="register?r=${r}" class="btn btn-small btn-primary">
					<s:message code="ui.register" text="ui.register"/>
				</a>
			</div>
			<div id="archaeo-fixed-menu-logo"></div>
			<h3 class="pull-left">
				<small>Deutsches Archäologisches Institut</small> <br>
				<a href="./" style="color:inherit">iDAI.gazetteer</a>
			</h3>
		</div>
		<div class="affix-menu-wrapper">
			<div id="affix-menu" style="z-index: 100000"
				class="navbar navbar-inverse gaz-container" data-spy="affix">
				<div class="navbar-inner">
					<div id="archaeo-fixed-menu-icon"></div>
					<a class="btn btn-navbar" data-toggle="collapse"
						data-target=".nav-collapse"> <span class="icon-bar"></span> <span
						class="icon-bar"></span> <span class="icon-bar"></span>
					</a>
					<a class="brand" href="">iDAI.gazetteer</a>
					<div class="nav-collapse pull-left">
						<ul class="nav">
							<li><a href="app/#!/thesaurus"><s:message
										code="ui.thesaurus.list" text="ui.thesaurus.list" /></a></li>
							<li><a href="app/#!/extended-search"> <s:message
										code="ui.search.extendedSearch" text="ui.search.extendedSearch" />
							</a></li>
							<sec:authorize access="hasRole('ROLE_EDITOR')">
								<li><a href="app/#!/create/"> <s:message
											code="ui.place.create" text="ui.place.create" />
								</a></li>
							</sec:authorize>
						</ul>
					</div>
					<!--/.nav-collapse -->
				</div>
			</div>
		</div>
	</div>

	<div class="gaz-container">
		<c:if test="${failure eq 'passwordLength'}">
			<div class="alert alert-error">
				<s:message code="ui.changePassword.error.passwordLength" text="ui.changePassword.error.passwordLength" />
			</div>
		</c:if>
		<c:if test="${failure eq 'passwordInequality'}">
			<div class="alert alert-error">
				<s:message code="ui.changePassword.error.passwordInequality" text="ui.changePassword.error.passwordInequality" />
			</div>
		</c:if>

		<div class="row">
			<div class="span6 offset3 well">
				<form class="form-horizontal" name="f" action="checkChangePasswordForm?userid=${user.id}" accept-charset="UTF-8" method="POST">
					<h3>
						<s:message code="ui.changePassword" text="ui.changePassword" />
					</h3>
					<div class="control-group">
							<label class="control-label"> <s:message
									code="ui.password" text="ui.password" />
							</label>
							<div class="controls">
								<input type="password" name="change_password_password" value="${change_password_password_value}" />
							</div>
					</div>
					
					<div class="control-group">
							<label class="control-label"> <s:message
									code="ui.passwordConfirmation" text="ui.passwordConfirmation" />
							</label>
							<div class="controls">
								<input type="password" name="change_password_password_confirmation" value="${change_password_password_confirmation_value}" />
							</div>
					</div>
					
					<div class="control-group">
						<label class="control-label">
							&nbsp;
						</label>
						<div class="controls">
							<a href="./" class="btn" data-dismiss="modal" aria-hidden="true"><s:message
										code="ui.cancel" text="ui.cancel" /></a>
							<s:message code="ui.ok" text="ui.ok" var="submitValue" />
							<input type="submit" class="btn btn-primary" value="${submitValue}" />
						</div>
					</div>
				</form>
			</div>
		</div>

		<!-- Footer -->
		<gaz:footer/>
		
	</div>
	
</body>
</html>
