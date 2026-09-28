import React from "react";
import Translate from "@docusaurus/Translate";

export const ModelSelectionTip = () => {
  return (
    <p>
      <Translate id="modelSelection.tip">
        goose relies heavily on tool calling capabilities and currently works best with Claude 4 models.
      </Translate>
    </p>
  );
};
