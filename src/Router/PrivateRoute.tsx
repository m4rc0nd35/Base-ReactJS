// import React, {Component, ElementRef, ElementType} from 'react';
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Authentication } from '../Service/AuthService';

export const PrivateRoute = ({ ...props }: RouteProps) => {
	return (
		Authentication.keepAlive()
			? <Route {...props} />
			: <Redirect to='/auth' />
	)
}

export const PublicRoute = ({ ...props }: RouteProps) => {
	return (
		Authentication.keepAlive()
			? <Redirect to='/' />
			: <Route {...props} />
	)
}