import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from './asyncConstants';

export const asyncActionsStart = () => {
	return {
		type: ASYNC_ACTION_START
	}
}

export const asyncActionsFinish = () => {
	return {
		type: ASYNC_ACTION_FINISH
	}
}

export const asyncActionsError = () => {
	return {
		type: ASYNC_ACTION_ERROR
	}
}