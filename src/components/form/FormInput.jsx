import React, { lazy, Suspense } from "react";

import PropTypes from "prop-types";
const Button = lazy(() => import("@components/Button"));
const Input = lazy(() => import("@components/Form/input"));
const Label = lazy(() => import("@components/Form/label"));


export default function FormInput({ onSubmit }) {
  return (
    <div className="mb-6">
      <Suspense fallback={<div>Loading...</div>}>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Enter description"
            />
          </div>
          <Button type="submit" variant="filled">
            Submit
          </Button>
        </form>
      </Suspense>
    </div>
  );
}
