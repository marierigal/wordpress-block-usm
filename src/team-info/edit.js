import { InspectorControls, RichText, useBlockProps as blockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { useState as wpUseState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { IconSearchModal } from '../shared/IconSearchModal/IconSearchModal';

export const edit = ( {
  attributes: { isEditable, isList, icon, iconStyle, title, content },
  setAttributes,
} ) => {
  const [ isIconModalOpen, setIsIconModalOpen ] = wpUseState( false );
  const openIconModal = () => setIsIconModalOpen( true );
  const closeIconModal = () => setIsIconModalOpen( false );

  const onChangeAttribute = ( attribute, value ) => {
    setAttributes( { [ attribute ]: value } );
  };

  const setIcon = value => {
    setAttributes( { icon: value.id, iconStyle: value.style } );
    closeIconModal();
  };

  return (
    <div { ...blockProps() }>
      <InspectorControls key="settings">
        <Panel header={ __( 'Style', 'usmb' ) }>
          <PanelBody>
            <PanelRow>
              <ToggleControl
                label={ __( 'Afficher comme liste', 'usmb' ) }
                checked={ isList }
                onChange={ value => onChangeAttribute( 'isList', value ) }
              />
            </PanelRow>
          </PanelBody>
        </Panel>
      </InspectorControls>

      <div
        className="usmb-team-info__icon-wrapper"
        onClick={ isEditable && openIconModal }
        role="button"
        tabIndex={ 0 }
        onKeyDown // a11y requirement
      >
        <i
          className={ `usmb-team-info__icon-wrapper__icon ${ iconStyle } fa-${ icon }` }
          style={ { cursor: isEditable ? 'pointer' : 'inherit' } }
        ></i>
      </div>

      <div className="usmb-team-info__content-wrapper">
        { isEditable ? (
          <RichText
            className="usmb-team-info__content-wrapper__title"
            value={ title }
            onChange={ value => onChangeAttribute( 'title', value ) }
            placeholder={ __( 'Titre', 'usmb' ) }
            tagName="h3"
          />
        ) : (
          <h3 className="usmb-team-info__content-wrapper__title">{ title }</h3>
        ) }

        <RichText
          className="usmb-team-info__content-wrapper__content"
          value={ content }
          onChange={ value => onChangeAttribute( 'content', value ) }
          placeholder={ __( 'Contenu', 'usmb' ) }
          tagName={ isList ? 'ul' : 'p' }
          multiline={ isList ? 'li' : false }
        />
      </div>

      { isIconModalOpen && <IconSearchModal onClose={ closeIconModal } onSave={ setIcon } /> }
    </div>
  );
};
