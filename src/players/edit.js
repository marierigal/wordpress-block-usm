import { InspectorControls, useBlockProps as blockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';
import { CATEGORIES } from './CATEGORIES';

export const edit = ( { attributes, setAttributes } ) => {
  const { category } = attributes;

  const onChangeCategory = selected => {
    if ( ! selected ) return;
    setAttributes( { category: selected } );
  };

  const usmbPlayersSlugToLabel = slug => {
    switch ( slug ) {
      case 'first-row':
        return __( 'Première ligne', 'usm-plugin' );
      case 'second-row':
        return __( 'Deuxième ligne', 'usm-plugin' );
      case 'third-row':
        return __( 'Troisième ligne', 'usm-plugin' );
      case 'scrum-half':
        return __( 'Demi de mêlée', 'usm-plugin' );
      case 'fly-half':
        return __( 'Demi d’ouverture', 'usm-plugin' );
      case 'centre':
        return __( 'Centre', 'usm-plugin' );
      case 'winger':
        return __( 'Ailier', 'usm-plugin' );
      case 'full-back':
        return __( 'Arrière', 'usm-plugin' );
      case 'staff':
        return __( 'Staff', 'usm-plugin' );
      default:
        return '';
    }
  };

  return (
    <div { ...blockProps() }>
      <InspectorControls key="settings">
        <Panel header={ __( 'Contenu', 'usmb' ) }>
          <PanelBody>
            <PanelRow>
              <SelectControl
                label={ __( 'Catégorie', 'usmb' ) }
                value={ category }
                options={ [
                  { label: '...', value: '' },
                  ...CATEGORIES.map( categorySlug => ( {
                    label: usmbPlayersSlugToLabel( categorySlug ),
                    value: categorySlug,
                  } ) ),
                ] }
                onChange={ onChangeCategory }
              />
            </PanelRow>
          </PanelBody>
        </Panel>
      </InspectorControls>

      { category ? (
        <>
          <ServerSideRender block="usmb/players" attributes={ attributes } />
        </>
      ) : (
        <div>{ __( 'Choisir une catégorie', 'usmb' ) }</div>
      ) }
    </div>
  );
};
