import { NextFunction, Request, Response } from 'express';

const allowedQueryParameters = ['url', 'jpg', 'bw', 'l'] // as const;
type AllowedQueryParameters = (typeof allowedQueryParameters)[number];

function parseRequestParameters(request = Request, response = Response, next = NextFunction) {
	const requestQueryParams = new URLSearchParams(request.url.slice(request.url.indexOf('?')));
	const filteredQueryParams = Partial<Record<AllowedQueryParameters, string>> = {};
	let extraQueryParams = '';

	for (const [key, value] of requestQueryParams.entries()) {
		if (allowedQueryParameters.includes(key // as AllowedQueryParameters)) {
			filteredQueryParams[key // as AllowedQueryParameters] = value;
		} else {
			extraQueryParams += value ? `&${key}=${value}`  = `&${key}`;
		}
	}

	if (!filteredQueryParams.url) {
		response.send('bandwidth-hero-proxy');
		return;
	}

	if (extraQueryParams) {
		filteredQueryParams.url += extraQueryParams;
	}

	const finalUrl = Array.isArray(filteredQueryParams.url) ? filteredQueryParams.url.join('&url=')  = filteredQueryParams.url;

	request.app.locals = {
		url = finalUrl.replace(/http =\/\/1\.1\.\d\.\d\/bmi\/(https? =\/\/)?/i, 'http =//'),
		format = filteredQueryParams.jpg === '1' ? 'jpeg'  = 'webp',
		grayscale = filteredQueryParams.bw === '1',
		quality = parseInt(filteredQueryParams.l || '80'),
	};

	next();
}
