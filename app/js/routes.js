Router.add('/', function() {
	if (app.current_user.id == undefined) {
		Router.go('/login');
	}
	else {
		Router.go('/intro');
		// change_tab('#/');
	}
});

Router.add('/intro', function() {
	app.showPage('intro');
});

Router.add('/login', function() {
	app.showPage('splash');
});

Router.add('/jornada', function() {
	app.showPage('panel_comenza');
});

Router.add('/hoja-de-ruta', function() {
	app.showPage('hoja');
});

Router.add('/panel-ots', function() {
	app.showPage('panel-ots');
});

Router.add('/agenda', function() {
	app.showPage('panel-agenda');
});

Router.add('/panel-listReplanteos', function() {
	app.showPage('panel-listReplanteos');
});

Router.add('/hoja_de_ruta', function() {
	app.showPage('hoja_de_ruta');
});

Router.add('/panel-correctivos', function() {
	app.showPage('panel-correctivos');
});





/**
 * Pre-login
 */
// Router.add('/login', function() {
// 	if (app.current_user != "-") {
// 		Router.go('/');
// 	}

// 	app.showPage('login', '#login-form');
// });

// Router.add('/pre_signup', function() {
// 	load_cities();
// 	app.showPage('pre_signup', '#pre_signup-form');
// });

// Router.add('/signup', function() {
// 	load_cities();
// 	app.showPage('signup', '#signup-form');
// });

// Router.add('/forgot', function() {
// 	app.showPage('forgot', '#forgot-form');
// });

// /**
//  * Tournaments
//  */
// // default
// Router.add('/tournaments', function() {
// 	// check user type
// 	if (app.user_type == "club") {
//        load_tournaments("", app.current_user);
//     }
//     else {
//        load_tournaments();
//     }
// 	app.showPage('tournaments', '.list-tournaments');
// 	change_tab('#/tournaments');
// });
// // new tournament form
// Router.add('/tournaments/new', function() {
// 	app.showPage('tournaments', '.new-tournament');
// 	change_tab('#/tournaments');
// });
// // show a tournament
// Router.add('/tournaments/:id', function(binds) {
//     show_tournament(binds.id);
//     app.showPage('tournaments', '.show-tournament');
// 	change_tab('#/tournaments');
// })
// // edit a tournament
// Router.add('/tournaments/:id/edit', function(binds) {
// 	load_tournament(binds.id);
// 	app.showPage('tournaments', '.new-tournament');
// 	change_tab('#/tournaments');
// });

// Router.add('/tournaments/search', function() {
// 	app.showPage('showTourn', '.row');
// });

// Router.add('/tournaments/calendar', function() {
// });

// Router.add('/tournaments/filters', function() {
// });

// /**
//  * Club calendar
//  */
// Router.add('/calendar', function() {
// 	club_calendar();
// 	app.showPage('calendar', '#calendar-reserve');
// 	change_tab('#/calendar');
// })

// Router.add('/calendar/reserve', function() {
// 	modal_reserve();
// 	app.showPage('calendar', '#calendar-reservation');
// 	change_tab('#/calendar');
// //	detectkey();
// })

// /**
//  * Player reserve
//  */
// Router.add('/reserve', function() {
// 	clear_reservation();
// 	load_reserve();
// 	app.showPage('reserve', '.box-search');
// 	change_tab('#/reserve');
// });

// Router.add('/reserve/results', function() {
// 	app.showPage('reserve', '.box-results');
// 	change_tab('#/reserve');
// });

// Router.add('/reserve/results/map', function() {

// });

// Router.add('/reserve/:club_id', function(binds) {
// 	app.showPage('reserve', '.box-calendar');
// 	change_tab('#/reserve');
// });

// Router.add('/reserve/:club_id/new', function(binds) {
// 	$('.fab-user-reservation').hide();
// 	app.showPage('reserve', '.box-reserve');
// 	change_tab('#/reserve');
// });

// /**
//  * Profiles
//  */
// Router.add('/profile', function() {
// 	if (app.user_type == "club") {
// 		calcular_estrellas(app.current_user);
// 		quitar_iconos();
// 		load_club_profile(app.current_user);
//     	app.showPage('profiles', '.club-profile');
// 	}
// 	else {
// 		calcular_estrellas(app.current_user);
// 		quitar_iconos();
// 		load_player_profile(app.current_user);
//     	app.showPage('profiles', '.player-profile');
// 	}
// 	change_tab('#/profile');
// });

// Router.add('/profile/edit', function() {
// 	app.showPage('profiles', '.edit-user-profile');
// 	load_edit_profile();
// 	change_tab('#/profile');
// });

// Router.add('/club/:id', function(binds) {
//     load_club_profile(binds.id);
//     app.showPage('profiles', '.club-profile');
// 	change_tab('#/profile');
// });

// Router.add('/player/:id', function(binds) {
// 	load_player_profile(binds.id);
// 	app.showPage('profiles', '.player-profile');
// 	change_tab('#/profile');
// });

// Router.add('/invitations', function() {
// 	//load_invitations(); hay que hacer el geter
// 	load_invitations(app.current_user,app.user_type);
// 	app.showPage('invitations', '#invitations-list');
// });

// Router.add('/show_reservation', function() {
// 	app.showPage('show_reservation', '#show_reservation');
// 	go_to();
// });

// Router.add('/invitation', function() {
// 	app.showPage('invitation', '#invitation_page');
// });

// Router.add('/inscriptions', function() {
// 	load_tourns_inscriptions(app.current_user,app.user_type);
// 	app.showPage('inscriptions', '#inscriptions-list');
// });

// Router.add('/inscriptos', function() {
// 	app.showPage('inscriptos', '#inscriptos-list');
// });

// Router.add('/inscriptos', function() {
// 	app.showPage('inscriptos', '#inscriptos-list');
// });

// Router.add('/notificaciones', function() {
// 	app.showPage('notificaciones', '#notificaciones-list');
// 	// load_notifications();
// 	// change_tab('#/notificaciones');
// });

// Router.add('/notificacion', function() {
// 	app.showPage('notificacion', '#notificacion-list');
// });

// Router.add('/favoritos', function() {
// 	load_favoritos();
// 	app.showPage('favoritos', '#favoritos-list');
// 	change_tab('#/favoritos');
// });

// Router.add('/reservation/:id', function(binds) {
//     get_reservation(binds.id);
// });


// listen
Router.listen(function() {
	// if (app.current_user == "-") {
	// 	Router.go('/login');
	// }
	if (window.location.hash == '#/profile') {
		$('#toggle-btnMenu').css('display', 'none');
		$('#toggle-btnMenuPer').css('display', 'block');
	} else {
		$('#toggle-btnMenu').css('display', 'block');
		$('#toggle-btnMenuPer').css('display', 'none');
	}
});


