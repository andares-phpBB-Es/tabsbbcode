<?php
/**
* @package Tabs BBCode
* @copyright (c) 2015 andares - http://www.phpbb-es.com
* @license http://opensource.org/licenses/gpl-license.php GNU Public License
*/

namespace phpbbes\tabsbbcode\event;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
* Event listener
*/
class listener implements EventSubscriberInterface
{
/**
* Assign functions defined in this class to event listeners in the core
*
* @return array
* @static
* @access public
*/
	static public function getSubscribedEvents()
	{
		return array(
			'core.user_setup' => 'load_language_on_setup',
		);
	}
	
	public function load_language_on_setup($event)
	{
		$lang_set_ext = $event['lang_set_ext'];
		$lang_set_ext[] = array(
			'ext_name' => 'phpbbes/tabsbbcode',
			'lang_set' => 'tabs_bbcode',
		);
		$event['lang_set_ext'] = $lang_set_ext;
	}
}
