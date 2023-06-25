import { Button, Flex, Modal, SearchControl } from '@wordpress/components';
import { useState as wpUseState } from '@wordpress/element';
import debounce from 'lodash.debounce';

export const IconSearchModal = ( { onClose, onSave } ) => {
  const [ searchInput, setSearchInput ] = wpUseState( '' );
  const [ selectedIcon, setSelectedIcon ] = wpUseState();
  const [ foundIcons, setFoundIcons ] = wpUseState( [] );

  const onValidate = () => {
    if ( ! selectedIcon || ! onSave || typeof onSave !== 'function' ) return;
    onSave( selectedIcon );
  };

  const searchIcons = debounce( async () => {
    const response = await fetch(
      `https://api.fontawesome.com`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          query: `
          query {
            search(version: "6.0.0", query: "${ searchInput }", first: 15) {
              id
              label
              familyStylesByLicense {
                free {
                  family
                  style
                }
              }
            }
          }
        `,
        } ),
      },
      300
    );

    const { data } = await response.json();

    if ( ! data?.search ) return setFoundIcons( [] );

    const filteredIcons = data.search
      .filter( ( { familyStylesByLicense } ) => familyStylesByLicense.free.length )
      .map( ( { id, label, familyStylesByLicense } ) =>
        familyStylesByLicense.free.map( ( { style } ) => ( {
          id,
          label,
          style: `fa${ style[ 0 ] }`,
        } ) )
      )
      .flat();

    setFoundIcons( filteredIcons );
  } );

  return (
    <Modal
      title="Choisir une icône"
      onRequestClose={ onClose }
      style={ { width: '100%', maxWidth: 600 } }
    >
      <SearchControl value={ searchInput } onChange={ setSearchInput } onKeyDown={ searchIcons } />

      { searchInput ? (
        <Flex style={ { justifyContent: 'flex-start', flexWrap: 'wrap', gap: 8 } }>
          { foundIcons.map( icon => (
            <div
              key={ `${ searchInput }_${ icon.style }-${ icon.id }` }
              style={ {
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #eee',
                borderRadius: 4,
                cursor: 'pointer',
                backgroundColor: selectedIcon === icon ? '#eee' : 'transparent',
              } }
              onClick={ () => setSelectedIcon( icon ) }
              role="button"
              tabIndex={ 0 }
              onKeyDown // a11y requirement
            >
              <i className={ `${ icon.style } fa-${ icon.id } fa-2x` } title={ icon.label } />
            </div>
          ) ) || 'Aucune icône trouvée' }
        </Flex>
      ) : (
        <p>Veuillez saisir un terme de recherche</p>
      ) }

      <hr />

      <Flex style={ { justifyContent: 'flex-end', gap: 16 } }>
        { selectedIcon && (
          <div
            style={ {
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #eee',
              borderRadius: 4,
            } }
          >
            <i
              className={ `${ selectedIcon.style } fa-${ selectedIcon.id } fa-2x` }
              title={ selectedIcon.label }
            />
          </div>
        ) }

        <Button variant="secondary" onClick={ onClose }>
          Annuler
        </Button>

        <Button variant="primary" onClick={ onValidate } disabled={ ! selectedIcon }>
          Valider
        </Button>
      </Flex>
    </Modal>
  );
};
