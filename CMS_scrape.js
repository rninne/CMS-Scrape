function storeMenuSections(menu){
    gs.updateSave(menu);

    var menu_sections = new GlideRecord('menu_section');

    menu_sections.addQuery('content_block_menu', menu.sys_id);

    menu_sections.query();

    while(menu_sections.next()){
        gs.updateSave(menu_sections);

        if(menu_sections.contains_menu){

            var menu = new GlideRecord('content_block_menu');

            if(menu.get('sys_id', menu_sections.contains_menu.sys_id)){
                storeMenuSections(menu);
            }
        }

        var menu_items = new GlideRecord('menu_item');
        
        menu_items.addQuery('menu_section', menu_sections.sys_id);

        menu_items.query();

        while(menu_items.next()){
            gs.updateSave(menu_items);
        }
    }
}

var site = new GlideRecord('content_site');

//ENTER YOUR SITE NAME HERE
if(site.get('name', 'ess')){
    gs.updateSave(site);

    var theme = new GlideRecord('content_theme');

    //Get the attached theme
    if(theme.get('sys_id', site.default_theme.sys_id)){
        gs.updateSave(theme);

        var content_theme_css = new GlideRecord('content_theme_css');

        content_theme_css.addQuery('content_theme', theme.sys_id);
        //Get all the m2m theme <-> CSS records

        content_theme_css.query();

        while(content_theme_css.next()){
            gs.updateSave(content_theme_css);

            var css = new GlideRecord('content_css');

            //Get the attached CSS records
            if(css.get('sys_id', content_theme_css.content_css.sys_id)){
                gs.updateSave(css);
            }
        }
    }

    //Get the attached layout
    var layout = new GlideRecord('sys_ui_macro');
    if(layout.get('sys_id', site.default_layout.sys_id)){
        gs.updateSave(layout);
    }

    var content_page = new GlideRecord('content_page');

    content_page.addQuery('content_site', site.sys_id);
    //Get all the pages attached to this site

    content_page.query();

    while(content_page.next()){
        //Packages.com.glideapp.home.Home.unloader(content_page);
        gs.updateSave(content_page);

        var theme = new GlideRecord('content_theme');

        //Get the attached theme
        if(theme.get('sys_id', content_page.content_theme.sys_id)){
            gs.updateSave(theme);

            var content_theme_css = new GlideRecord('content_theme_css');

            content_theme_css.addQuery('content_theme', theme.sys_id);
            //Get all the m2m theme <-> CSS records

            content_theme_css.query();

            while(content_theme_css.next()){
                gs.updateSave(content_theme_css);

                var css = new GlideRecord('content_css');

                //Get the attached CSS records
                if(css.get('sys_id', content_theme_css.content_css.sys_id)){
                    gs.updateSave(css);
                }
            }
        }

        //Get the attached layout
        var layout = new GlideRecord('sys_ui_macro');
        if(layout.get('sys_id', content_page.layout.sys_id)){
            gs.updateSave(layout);
        }

        var drop_zone = new GlideRecord('sys_portal');

        drop_zone.addQuery('page', content_page.sys_id);
        //Get all the drop zones attached to the page

        drop_zone.query();

        while(drop_zone.next()){
            gs.updateSave(drop_zone);

            var drop_zone_item = new GlideRecord('sys_portal_preferences');

            drop_zone_item.addQuery('portal_section', drop_zone.sys_id);
            //Get all the blocks in the drop zone

            drop_zone_item.query();

            var item, type;

            while(drop_zone_item.next()){
                gs.updateSave(drop_zone_item);

                if(drop_zone_item.name == 'sys_id') {
                    item = drop_zone_item.value + '';
                }
                if(drop_zone_item.name == 'type') {
                    type = drop_zone_item.value + '';
                }
            }

            var block = new GlideRecord(type);

            if(block.get('sys_id', item)){
                gs.updateSave(block);

                if(type == 'content_block_menu'){
                    storeMenuSections(block);
                }

                if(type == 'content_block_header'){
                    
                    var menu = new GlideRecord('content_block_menu');

                    if(menu.get('sys_id', block.top_menu.sys_id)){
                        storeMenuSections(menu);
                    }

                    if(menu.get('sys_id', block.bottom_menu.sys_id)){
                        storeMenuSections(menu);
                    }
                }
            }
        }
    }

    var content_type = new GlideRecord('content_type');

    content_type.addQuery('content_site', site.sys_id);

    content_type.query();

    while(content_type.next()){
        gs.updateSave(content_type);
    }
}
/*
var images = new GlideRecord('db_image');

images.addQuery('name', 'LIKE', 'globalserve');

images.query();

while(images.next()){
    gs.updateSave(images);
}
*/