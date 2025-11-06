import * as yup from "yup";

// Contact form validation schema
export const contactSchema = yup.object({
	firstname: yup.string().required("Voornaam is verplicht"),
	lastname: yup.string().required("Achternaam is verplicht"),
	email: yup.string().email("Ongeldig e-mailadres").required("E-mailadres is verplicht"),
	subject: yup.string().required("Onderwerp is verplicht"),
	message: yup.string().required("Bericht is verplicht"),
});

// Review form validation schema
export const reviewSchema = yup.object({
	firstname: yup.string().required("Voornaam is verplicht"),
	lastname: yup.string().required("Achternaam is verplicht"),
	email: yup.string().email("Ongeldig e-mailadres").required("E-mailadres is verplicht"),
	rating: yup.number().min(1, "Selecteer een waardering").required("Waardering is verplicht"),
});
