import { InspectorControls, useBlockProps as blockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, SelectControl } from '@wordpress/components';
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
        return 'Première ligne';
      case 'second-row':
        return 'Deuxième ligne';
      case 'third-row':
        return 'Troisième ligne';
      case 'scrum-half':
        return 'Demi de mêlée';
      case 'fly-half':
        return 'Demi d’ouverture';
      case 'centre':
        return 'Centre';
      case 'winger':
        return 'Ailier';
      case 'full-back':
        return 'Arrière';
      case 'staff':
        return 'Staff';
      default:
        return '';
    }
  };

  return (
    <div { ...blockProps() }>
      <InspectorControls key="settings">
        <Panel header="Contenu">
          <PanelBody>
            <PanelRow>
              <SelectControl
                label="Catégorie"
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
        <div>Choisir une catégorie</div>
      ) }
    </div>
  );
};
