import { useState } from "react";
import PropTypes from "prop-types";
import Input from "./input";
import Textarea from "./Textarea";
import FormField from "./FormField";
import FormActions from "./FormActions";
import CharacterCounter from "./CharacterCounter";
import { useLang } from "@/hooks/useLang";

export default function FormInput({ 
  onSubmit, 
  initialData = { title: "", body: "" },
  submitText = "Submit",
  showCancel = false,
  onCancel,
  titleMaxLength = 50,
  bodyMaxLength = 500,
}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const { t } = useLang();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = t("form.titleRequired");
    } else if (formData.title.length > titleMaxLength) {
      newErrors.title = t("form.titleMaxLength").replace("{{max}}", titleMaxLength);
    }
    
    if (!formData.body.trim()) {
      newErrors.body = t("form.contentRequired");
    } else if (formData.body.length > bodyMaxLength) {
      newErrors.body = t("form.contentMaxLength").replace("{{max}}", bodyMaxLength);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 transition-colors duration-300">
      <FormField
        label={t("form.title")}
        htmlFor="title"
        required
        error={errors.title}
        helpText={t("form.maxCharacters").replace("{{max}}", titleMaxLength)}
      >
        <Input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          placeholder={t("form.titlePlaceholder")}
          required
          maxLength={titleMaxLength}
        />
        <CharacterCounter 
          current={formData.title.length} 
          max={titleMaxLength}
          className="mt-2"
        />
      </FormField>

      <FormField
        label={t("form.content")}
        htmlFor="body"
        required
        error={errors.body}
        helpText={t("form.maxCharacters").replace("{{max}}", bodyMaxLength)}
      >
        <Textarea
          name="body"
          id="body"
          value={formData.body}
          onChange={handleChange}
          placeholder={t("form.contentPlaceholder")}
          rows={12}
          required
          maxLength={bodyMaxLength}
        />
        <CharacterCounter 
          current={formData.body.length} 
          max={bodyMaxLength}
          className="mt-2"
        />
      </FormField>

      <FormActions
        submitText={submitText}
        cancelText={t("form.cancel")}
        onCancel={showCancel ? onCancel : null}
        submitDisabled={!formData.title.trim() || !formData.body.trim()}
      />
    </form>
  );
}

FormInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  submitText: PropTypes.string,
  showCancel: PropTypes.bool,
  onCancel: PropTypes.func,
  titleMaxLength: PropTypes.number,
  bodyMaxLength: PropTypes.number,
};

