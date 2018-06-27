import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Routes from "./routes";
import Notifications from 'react-notify-toast';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React, { Component } from "react";
import "./App.css";

const muiTheme = getMuiTheme({
	menuItem: {
		selectedTextColor: "green"
	}
});
class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={ muiTheme }>
				<div>
					<Notifications />
					<Routes/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
