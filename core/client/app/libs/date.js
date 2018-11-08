let self = module.exports = {
	calculatorDiffTime: (start, end) => {
		let subDate = Math.floor((end.getTime() - start.getTime()) / 1000);

		if (subDate < 0)
			return "1 minute later";
		let y = subDate / (86400 * 365);
		y = Math.floor(y);
		if (y > 0) {
			return y + " year later";
		}
		let m = (subDate) / (86400 * 30);
		m = Math.floor(m);
		if (m > 0) {
			return m + " month later";
		}
		let d = (subDate) / (86400);
		d = Math.floor(d);
		if (d > 0) {
			return d + " day later";
		}
		let h = subDate / 3600;
		h = Math.floor(h);
		let i = (subDate - h * 3600) / 60;
		i = Math.floor(i);
		if (h > 0) {
			return h + " hour later";
		} else if (i > 0) {
				return i + " minute later";
		} else {
			return "1 minute later";
		}
	},

	calculatorDiffTimeActive: (start, end) => {
		let subDate = Math.floor((end.getTime() - start.getTime()) / 1000);

		if (subDate < 0)
			return "1 minute left";
		let y = subDate / (86400 * 365);
		y = Math.floor(y);
		if (y > 0) {
			return y + " year left";
		}
		let m = (subDate) / (86400 * 30);
		m = Math.floor(m);
		if (m > 0) {
			return m + " month left";
		}
		let d = (subDate) / (86400);
		d = Math.floor(d);
		if (d > 0) {
			return d + " day left";
		}
		let h = subDate / 3600;
		h = Math.floor(h);
		let i = (subDate - h * 3600) / 60;
		i = Math.floor(i);
		if (h > 0) {
			return h + " hour left";
		} else if (i > 0) {
				return i + " minute left";
		} else {
			return "1 minute left";
		}
	},

	formartDateTime: (time) => {
		if (!time) return 'TBA'
		let d = new Date(time);
		let curr_date = d.getDate();
		let curr_month = d.getMonth() + 1;
		let curr_year = d.getFullYear();
		let curr_hours = d.getHours();
	
		curr_date = (curr_date < 10) ? '0'+curr_date : curr_date;
		curr_month = (curr_month < 10) ? '0'+curr_month : curr_month;
	
		return curr_date + "/" + curr_month + "/" + curr_year ;
	},
	formartDateTime2: (time) => {
		if (!time) return 'TBA'
		let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
		let d = new Date(time);
		let curr_date = d.getDate();
		let curr_month = d.getMonth() + 1;
		let curr_year = d.getFullYear();
	
		curr_date = (curr_date < 10) ? '0'+curr_date : curr_date;
	
		return curr_date + " " + month[parseInt(curr_month)] + " " + curr_year ;
	},

	checkTimeIco: (start, end) => {
		let now = new Date()
		let startTime = start ? new Date(start) : now
		let endTime = end ? new Date(end) : now

		if (!start && !end) {
			return {
				title: 'Date',
				time: 'TBA'
			}
		}
	
		if (start && startTime > now) {
			return {
				title: 'Start in',
				time: self.calculatorDiffTime(now, startTime)
			}
		}
	
		if (startTime < now && endTime >= now) {
			if (!end) {
				return {
					title: 'Date',
					time: 'TBA'
				}
			}
	
			return {
				title: 'End date',
				time: self.formartDateTime(end)
			}
		}
	
		if (end && endTime < now) {
			return {
				title: 'Ended',
				time: self.formartDateTime(end)
			}
		}
	},

	checkTimeIcoActive: (start, end) => {
		let now = new Date()
		let startTime = start ? new Date(start) : now
		let endTime = end ? new Date(end) : now
	
		if (startTime < now && endTime >= now) {
			if (!end) return 'Date: TBA'
	
			return self.calculatorDiffTimeActive(endTime, now)
		} else {
			return 'Date: TBA'
		}
	},

	checkTimeIcoRow: (start, end) => {
		let now = new Date()
		let startTime = start ? new Date(start) : now
		let endTime = end ? new Date(end) : now
	
		if (startTime >= now && ((!start && !end) || start)) {
			if (!start && !end) 
				return {
					title: 'Date: ',
					time: 'TBA'
				}
			return {
				title: 'Start in ',
				time: self.calculatorDiffTime(now, startTime)
			}
		}
	
		if (startTime < now && endTime >= now) {
			if (!end) return {
				title: 'Date: ',
				time: 'TBA'
			}
	
			return {
				title: '',
				time: self.calculatorDiffTimeActive(now, endTime)
			}
		}
	
		if (end && endTime < now) {
			return {
				title: 'Ended ',
				time: self.formartDateTime(end)
			}
		}
	},
}