<?php
/**
* @package Tabs BBCode
* @copyright (c) 2015 andares - http://www.phpbb-es.com
* @license http://opensource.org/licenses/gpl-license.php GNU Public License
*/

namespace phpbbes\tabsBbcode\migrations;

class update_table extends \phpbb\db\migration\migration
{

	public function update_data()
	{
		return array(
		 array('custom', array(array($this, 'install_tabs_bbcode'))),
		);
	}

	public function install_tabs_bbcode()
	{

		$bbcode_data = array(
			'tabmenu' => array(
				'bbcode_helpline'	=> 'BBCTBS_TABMENU_HELPLINE',
				'bbcode_match'		=> '[tabmenu]{TEXT}[/tabmenu]',
				'bbcode_tpl'		=> '<div class="tabmenu">{TEXT}</div>',
			),
			'tab' => array(
				'bbcode_helpline'	=> 'BBCTBS_TAB_HELPLINE',
				'bbcode_match'		=> '[tab={TEXT1}]{TEXT2}[/tab]',
				'bbcode_tpl'		=> '<div class="tab"><h4 class="tabtitle">{TEXT1}</h4><div class="tabcontent"><div class="tabcontent_top"></div>{TEXT2}</div></div>',
			),			
		);

		global $db, $request, $user;
		$acp_manager = new \phpbbes\tabsBbcode\includes\acp_manager($db, $request, $user, $this->phpbb_root_path, $this->php_ext);
		$acp_manager->install_bbcodes($bbcode_data);
	}
}
