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
		endDate: new Date("July 20, 2014 11:11:11")
		
		/***   TRANSLATION : Enable following line by delete //   ***/
		// ,titleDays : 'hari', titleHours : 'jam', titleMinutes : 'menit', titleSeconds : 'detik'
	};	
	
	$('#container').wajik(options);
	
});