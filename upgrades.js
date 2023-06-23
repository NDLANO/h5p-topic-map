/* global H5PUpgrades */
H5PUpgrades['H5P.TopicMap'] = (() => {
  // Avoiding to use H5P.createUUID as H5P function may change
  const createUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, (char) => {
        const random = Math.random() * 16 | 0;
        const newChar = (char === 'x') ? random : (random & 0x3 | 0x8);
        return newChar.toString(16);
      });
  };

  return {
    0: {
      /**
       * Replace some text fields with H5P.Text.
       * @param {object} parameters Parameters.
       * @param {function} finished Callback when done.
       * @param {object} extras Extras such as metadata.
       */
      2: (parameters, finished, extras) => {
        if (parameters?.topicMap) {
          if (parameters.topicMap.arrowItems) {
            parameters.topicMap.arrowItems =
              parameters.topicMap.arrowItems.map((item) => {
                const newItem = { ...item };

                if (newItem.description) {
                  newItem.description = {
                    library: 'H5P.Text 1.1',
                    params: {
                      text: `<p>${newItem.description}</p>` // Was plain text
                    },
                    subContentId: createUUID()
                  };
                }

                if (newItem.dialog?.text) {
                  newItem.dialog.text = {
                    library: 'H5P.Text 1.1',
                    params: {
                      text: newItem.dialog.text // Was HTML widget
                        .replace(/<h4>/, '<p><strong>')
                        .replace(/<\/h4>/, '</strong></p>')
                        .replace(/<h5>/, '<p><em><strong>')
                        .replace(/<\/h5>/, '</strong></em></p>')
                        .replace(/<h6>/, '<p><em>')
                        .replace(/<\/h6>/, '</em></p>')
                    },
                    subContentId: createUUID()
                  };
                }

                return newItem;
              });
          }

          if (parameters.topicMap.topicMapItems) {
            parameters.topicMap.topicMapItems =
              parameters.topicMap.topicMapItems.map((item) => {
                const newItem = { ... item };

                if (newItem.description) {
                  newItem.description = {
                    library: 'H5P.Text 1.1',
                    params: {
                      text: `<p>${newItem.description}</p>` // Was plain text
                    },
                    subContentId: createUUID()
                  };
                }

                if (newItem.dialog?.text) {
                  newItem.dialog.text = {
                    library: 'H5P.Text 1.1',
                    params: {
                      text: newItem.dialog.text // Was HTML widget
                        .replace(/<h4>/, '<p><strong>')
                        .replace(/<\/h4>/, '</strong></p>')
                        .replace(/<h5>/, '<p><em><strong>')
                        .replace(/<\/h5>/, '</strong></em></p>')
                        .replace(/<h6>/, '<p><em>')
                        .replace(/<\/h6>/, '</em></p>')
                    },
                    subContentId: createUUID()
                  };
                }

                return newItem;
              });
          }
        }

        finished(null, parameters, extras);
      }
    }
  };
})();
