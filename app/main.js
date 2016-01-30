/*global $*/
/*global document*/

import GameController from './controller/GameController';

$(document).ready(function() {
  new GameController($(window).width(), $(window).height());
});
