import { InspectorControls, useBlockProps as blockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { CATEGORIES } from './CATEGORIES';

export const edit = ( { attributes, setAttributes } ) => {
  const { category } = attributes;

  const onChangeCategory = selected => {
    if ( ! selected ) return;
    setAttributes( { category: selected } );
  };

  const usmbSponsorsSlugToLabel = slug => {
    switch ( slug ) {
      case 'privilege':
        return __( 'Privilège', 'usm-plugin' );
      case 'first-rower':
        return __( 'Première ligne', 'usm-plugin' );
      case 'second-rower':
        return __( 'Deuxième ligne', 'usm-plugin' );
      case 'third-rower':
        return __( 'Troisième ligne', 'usm-plugin' );
      case 'centre':
        return __( '3/4 Centre', 'usm-plugin' );
      case 'green-and-black':
        return __( 'Vert & Noir', 'usm-plugin' );
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
                    label: usmbSponsorsSlugToLabel( categorySlug ),
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
          <h3 className="usmb-sponsors__title">{ usmbSponsorsSlugToLabel( category ) }</h3>
          <div className="usmb-sponsors__skeleton" />
        </>
      ) : (
        <div>{ __( 'Choisir une catégorie', 'usmb' ) }</div>
      ) }
    </div>
  );
};
