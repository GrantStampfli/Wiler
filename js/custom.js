/***   ------------------------------------------------------   ***/
/***     PLEASE NOTE                                            ***/
/***     THIS FILE USED TO NON YOUTUBE VIDEO BACKGROUND         ***/
/***   ------------------------------------------------------   ***/
jQuery(document).ready(function($){

	/***   ------------------------------------------------------   ***/
	/***     CHANGE DATE                                            ***/
	/***     DATE FORMAT: Month Date, Year Hour:Minute:Second       ***/
	/***   ------------------------------------------------------   ***/
	var options = {
		startDate : new Date(),
		endDate: new Date("February 31, 2014 11:13:00")
		
		/***   TRANSLATION : Enable following line by delete //   ***/
		// ,titleDays : 'hari', titleHours : 'jam', titleMinutes : 'menit', titleSeconds : 'detik'
	};	
	
	$('#container').wajik(options);
	
});