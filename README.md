# PINsimple


The file Libraries/CustomComponents/Navigator/Navigator.js
was modified, remplace the render method. by this. 

render: function() {
    var newRenderedSceneMap = new Map();
    var scenes = this.state.routeStack.map((route, index) => {
      var renderedScene;
     if (this._renderedSceneMap.has(route)) {
          renderedScene = this._renderedSceneMap.get(route);
        } else {
          renderedScene = this._renderScene(route, index);
        }
      newRenderedSceneMap.set(route, renderedScene);
      return renderedScene;
    });
    this._renderedSceneMap = newRenderedSceneMap;
    return (
      <View style={[styles.container, this.props.style]}>
        <View
          style={styles.transitioner}
          {...this.panGesture.panHandlers}
          onTouchStart={this._handleTouchStart}
          onResponderTerminationRequest={
            this._handleResponderTerminationRequest
          }>
          {scenes}
        </View>
        {this._renderNavigationBar()}
      </View>
    );
  },