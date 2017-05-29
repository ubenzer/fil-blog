import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import {baseUrl} from '../../../config'

const Comments = ({url}) =>
  <div className="card comments main-container__items">
    <div className="card__contents" id="disqus_thread" />
    <Helmet script={[
      {
        innerHTML: `
        var disqus_config = function () {
          this.page.url = "${baseUrl}${url}";
        };
        (function() {
          var d = document, s = d.createElement('script');
          s.src = 'https://ubenzer.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
        `,
        type: 'text/javascript'
      }
    ]}
    />
  </div>

Comments.propTypes = {url: PropTypes.string.isRequired}

export {Comments}
