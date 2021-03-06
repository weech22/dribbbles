import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Input from "./Input";
import TagBlock from "./TagBlock";

const Wrap = styled.View``;

const TagInput = ({ input }) => {
  const { onChange } = input;
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const handleSubmitEditing = useCallback(() => {
    if (tag && tags.indexOf(tag) === -1 && tags.length < 12) {
      setTags([...tags, tag]);
      // TODO: move this into a callback of setTags
      onChange(tags);
    }
    setTag("");
  }, [tag, tags]);

  const handleChange = useCallback(
    e => {
      setTag(e);
    },
    [tags]
  );

  const removeTag = useCallback(
    tag => {
      setTags(tags.filter(x => x !== tag));
    },
    [tags]
  );

  return (
    <Wrap>
      <Input
        tagInput={true}
        input={input}
        blurOnSubmit={false}
        autoCorrect={false}
        value={tag}
        onTagChange={handleChange}
        onSubmitEditing={handleSubmitEditing}
      />
      <TagBlock tags={tags} removeTag={removeTag} />
    </Wrap>
  );
};

export default TagInput;
