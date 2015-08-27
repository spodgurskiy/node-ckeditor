// Register a new CKEditor plugin.
// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.resourceManager.html#add
CKEDITOR.plugins.add( 'ptAddLink',
{
	// The plugin initialization logic goes inside this method.
	// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.pluginDefinition.html#init
	init: function( editor )
	{
		// Create an editor command that stores the dialog initialization command.
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.command.html
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialogCommand.html
		editor.addCommand( 'ptAddLinkDialog', new CKEDITOR.dialogCommand( 'ptAddLinkDialog' ) );
 
		// Create a toolbar button that executes the plugin command defined above.
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.html#addButton
		editor.ui.addButton( 'ptAddLink',
		{
			// Toolbar button tooltip.
			label: 'Insert a Link',
			// Reference to the plugin command name.
			command: 'ptAddLinkDialog',
			// Button's icon file path.
			icon: this.path + 'images/icon.png'
		} );
 
		// Add a new dialog window definition containing all UI elements and listeners.
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#.add
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html
		CKEDITOR.dialog.add( 'ptAddLinkDialog', function( editor )
		{
			return {
				// Basic properties of the dialog window: title, minimum size.
				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.dialogDefinition.html
				title : 'Link Properties',
				minWidth : 500,
				minHeight : 200,
				// Dialog window contents.
				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.definition.content.html
				contents :
				[
					{
						// Definition of the Settings dialog window tab (page) with its id, label and contents.
						// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.contentDefinition.html
						id : 'general',
						label : 'Settings',
						elements :
						[
                            {
                                type : 'hbox',
                                widths : [ '40%', '10%', '50%' ],
                                children :
                                [
                                    {
                                        type : 'text',
                                        id : 'url',                                        
                                        validate : CKEDITOR.dialog.validate.notEmpty( 'The link must have a URL.' ),
                                        required : true,
                                        commit : function( data )
                                        {
                                            data.url = this.getValue();
                                        }
                                    },
                                    {
                                        type : 'html',
                                        html : 'OR'
                                    },
                                    {
                                        type : 'hbox',
                                        widths : [ '25%', '25%', '25%', '25%' ],
                                        children :
                                        [
                                            {
                                                type : 'button',
                                                className : 'pt-add-link-custom pt-bookmark',
                                                id : 'ptbookmark',
                                                title : 'Bookmark',
                                                onClick : function() {}
                                            },
                                            {
                                                type : 'button',
                                                className : 'pt-add-link-custom pt-recycle',
                                                id : 'ptrecycle',
                                                title : 'Recycle',
                                                onClick : function() {}
                                            },
                                            {
                                                type : 'button',
                                                className : 'pt-add-link-custom pt-promo',
                                                id : 'ptpromo',
                                                title : 'Promotions',
                                                onClick : function() {}
                                            },
                                            {
                                                type : 'button',
                                                className : 'pt-add-link-custom pt-related',
                                                id : 'ptrelated',
                                                title : 'Related',
                                                onClick : function() {}
                                            }
                                        ]
                                        
                                    }
                                ]
                            },
                            {
                                type : 'hbox',
                                widths : [ '50%', '50%' ],
                                children :
                                [
                                    {
                                        type : 'select',
                                        id : 'target',
                                        items : [['Not Set', 'notSet'], ['Blank', '_blank'], ['Named Window', 'frame'], ['Top', '_top'], ['Self', '_self'], ['Parent', '_parent']],
                                        commit : function( data )
                                        {
                                            data.target = this.getValue();
                                        }
                                    },
                                    {
                                        type : 'text',
                                        id : 'targetName',
                                        placeholder : 'Target name',
                                        commit : function( data )
                                        {
                                            data.targetName = this.getValue();
                                        }
                                    }
                                ]
                            }
						]
					}
				],
				onOk : function()
				{
					// Create a link element and an object that will store the data entered in the dialog window.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.document.html#createElement
					var dialog = this,
						data = {},
						link = editor.document.createElement( 'a' );
					// Populate the data object with data entered in the dialog window.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dialog.html#commitContent
					this.commitContent( data );

					// Set the URL (href attribute) of the link element.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.element.html#setAttribute
					link.setAttribute( 'href', data.url );

					// In case the "newPage" checkbox was checked, set target=_blank for the link element.
					if ( data.newPage )
						link.setAttribute( 'target', '_blank' );

					// Set the style selected for the link, if applied.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.element.html#setStyle
					switch( data.style )
					{
						case 'b' :
							link.setStyle( 'font-weight', 'bold' );
						break;
						case 'u' :
							link.setStyle( 'text-decoration', 'underline' );
						break;
						case 'i' :
							link.setStyle( 'font-style', 'italic' );
						break;
					}

					// Insert the Displayed Text entered in the dialog window into the link element.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.dom.element.html#setHtml
					link.setHtml( data.contents );

					// Insert the link element into the current cursor position in the editor.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#insertElement
					editor.insertElement( link );
				}
			};
		} );
	}
} );