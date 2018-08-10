import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from '@/routes/app/index';

const rootRoute = ({ history }) => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={require('@/routes/app/index').default} />
				<Route exact path="/login" exact component={require('@/routes/login/login').default} />
				<App>
					<Switch>
						<Route exact path="/essay/essayList" component={require('@/routes/index/essay/page/essayList.js').default} />
						<Route exact path="/essay/addEssay" component={require('@/routes/index/essay/page/addEssay.js').default} />
						<Route exact path="/essay/editEssay/:id" component={require('@/routes/index/essay/page/editEssay.js').default} />
						<Route exact path="/essay/speech/:id" component={require('@/routes/index/essay/page/speech.js').default} />
						<Route exact path="/resources/list" component={require('@/routes/index/resources/page/list.js').default} />
						
						
						
						<Route exact path="/sys/power" component={require('@/routes/sys/power/power.js').default} />
						<Route exact path="/sys/dict" component={require('@/routes/sys/dict/page/dict.js').default} />
						<Route exact path="/sys/menu" component={require('@/routes/sys/menu/menu.js').default} />
						<Route exact path="/sys/user" component={require('@/routes/sys/user/page/user.js').default} />
						<Route exact path="403" component={require('@/routes/error/403.js').default} />
						<Route exact path="500" component={require('@/routes/error/500.js').default} />
						<Route exact path="*" component={require('@/routes/error/404.js').default} />
					</Switch>
				</App>
			</Switch>
		</Router>
	);
}
export default rootRoute;


