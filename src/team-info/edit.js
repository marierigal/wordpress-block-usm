import { RichText, useBlockProps as blockProps } from '@wordpress/block-editor';

export const edit = ( { attributes: { icon, title, content }, setAttributes } ) => {
  const onChangeContent = value => {
    setAttributes( { content: value } );
  };

  return (
    <div { ...blockProps() }>
      <div className="icon-wrapper">
        <span className={ `icon dashicons dashicons-${ icon }` }></span>
      </div>
      <div className="content-wrapper">
        <h3 className="title">{ title }</h3>
        <RichText
          className="content"
          value={ content }
          onChange={ onChangeContent }
          tagName="ul"
          multiline="li"
        />
      </div>
    </div>
  );
};
