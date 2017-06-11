import React from 'react';
import PropTypes from 'prop-types';
import sampleDoc from '../../assets/images/document.png';

class Document extends React.Component {

 render() {
  const { UserId, RoleId } = this.props.user;
  const { OwnerId, permission } = this.props.document;
   let action = (
     <li>
       <a className="btn-floating waves-effect waves-light light-blue">
         <i className="fa fa-info activator"></i>
       </a>

     </li>
   );

   if (RoleId === 1 || OwnerId === UserId) {
     action = (
       <ul className="card-action-buttons">
       <li>
         <a className="btn-floating waves-effect waves-light light-blue">
           <i className="fa fa-info activator"></i>
         </a>
       </li>
       <li>
         <a className="btn-floating waves-effect waves-light green">
           <i className="fa fa-edit"></i>
         </a>
       </li>
       <li>
         <a className="btn-floating waves-effect waves-light red">
           <i className="fa fa-trash"></i>
         </a>

       </li>
     </ul>
     );
   } else if (permission === 'public') {
     return (
     <ul className="card-action-buttons">
     <li>
       <a className="btn-floating waves-effect waves-light light-blue">
         <i className="fa fa-info activator"></i>
       </a>
     </li>
     <li>
       <a className="btn-floating waves-effect waves-light light-blue">
         <i className="fa fa-edit"></i>
       </a>
     </li>
     <li>
     </li>
   </ul>
 );
   }
   const isPublic = (
     <a className="btn-floating btn-large
       btn-permission waves-effect waves-light
          green">
       <i className="fa fa-unlock" />
       </a>
   );

   const isPrivate = (
     <a className="btn-floating btn-large
       btn-permission waves-effect waves-light
         pink red">
       <i className="fa fa-lock" />
       </a>
   );

   return (
     <div className="col s12 m12 l4">
        <div className="document-card">
          <div className="card hoverable">
            <div className="card-image waves-effect waves-block waves-light">
              { permission === 'public' ? isPublic : isPrivate }
                <img src={sampleDoc} alt="document-img" />
            </div>
               {action}
            <div className="card-content">
                <div className="row">
                  <p className="card-title grey-text text-darken-4">
                    <a href="#" className="grey-text text-darken-4">{this.props.document.title}</a>
                  </p>
               </div>
             </div>
             <div className="card-reveal">
              <span className="card-title grey-text text-darken-4"><i className="fa fa-close right"></i> {this.props.document.title} </span>
                {this.props.document.content}
             </div>
         </div>
      </div>
    </div>
   );
 }

}

Document.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Document;
