import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Typography, Input, Textarea, Button } from "@material-tailwind/react";
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useGetUserID } from '../../hooks/useGetUserID.js';
import { AiOutlineDelete } from "react-icons/ai";

const URI = process.env.REACT_APP_SERVER_URL;

export const RecipeAdd = () => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        imageUrl: "",
        region: [],
        type: [],
        nutritionFacts: {},
        goodFor: [],
        notGoodFor: [],
        steps: [],
        prepare: "",
        ingredients: [],
        timing: 0,
        budgetPerUnit: {},
        userOwner: ""
    });

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URI + "/admin/recipes/create");
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const { control, register, handleSubmit } = useForm();
    const [ingredients, setIngredients] = useState([{ id: "", quantity: "" }]);
    const [steps, setSteps] = useState([{ step: "", timing: "" }]);

    const optionsRecipeTypes = data.recipeTypes?.map((recipeType) => ({
        value: recipeType._id,
        label: recipeType.name,
    })) || [];

    const optionsHealths = data.healths?.map((health) => ({
        value: health._id,
        label: health.name,
    })) || [];

    const optionsRegions = data.regions?.map((region) => ({
        value: region._id,
        label: region.name,
    })) || [];

    const optionsIngredients = data.ingredients?.map((ingredient) => ({
        value: ingredient._id,
        label: ingredient.name,
    })) || [];

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            borderColor: '#ed8936',
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#ed8936' : provided.borderColor,
            boxShadow: state.isFocused ? '0 0 0 1px #ed8936' : provided.boxShadow,
            '&:hover': {
                ...provided['&:hover'],
                borderColor: state.isFocused ? '#ed8936' : provided.borderColor,
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#ed8936' : provided.backgroundColor,
            color: state.isFocused ? '#fff' : provided.color,
            ':hover': {
                ...provided[':hover'],
                backgroundColor: state.isFocused ? '#ed8936' : '#f3f4f6',
            },
        }),
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { id: "", quantity: "" }]);
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const handleAddStep = () => {
        setSteps([...steps, { step: "", timing: "" }]);
    };

    const handleRemoveStep = (index) => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
    };

    useEffect(() => {
        if (recipe) {
            console.log("Updated Recipe:", recipe);
        }
    }, [recipe]);

    const onSubmit = async (formData) => {
        try {
            // Calculate the total value
            const findIngredientById = (ingredientId) => {
                if (data && data.ingredients) {
                    return data.ingredients.find((ingredient) => ingredient._id === ingredientId);
                }
                return null;
            };
            
            let budgetperunit = 0, calories = 0, cholesterol = 0, protein = 0, caffeine = 0;

            const ingredientIds = formData.ingredients;
            ingredientIds.forEach((ingredientId) => {
                const ingredient = findIngredientById(ingredientId.id.value);
                if (ingredient) {
                    calories += ingredient.nutritionFacts.calories.num * ingredientId.quantity;
                    cholesterol += ingredient.nutritionFacts.cholesterol.num * ingredientId.quantity;
                    protein += ingredient.nutritionFacts.protein.num * ingredientId.quantity;
                    caffeine += ingredient.nutritionFacts.caffeine.num * ingredientId.quantity;
                    budgetperunit += ingredient.costPerUnit.cost * ingredientId.quantity;
                    console.log("Ingredient found:", ingredient);
                } else {
                    console.log("Ingredient not found:", ingredientId);
                }
            });

            // asign the value to post
            const newRecipe = {
                name: formData.name,
                description: formData.description,
                imageUrl: formData.imageurl,
                region: Array.isArray(formData.region) ? formData.region.map((item) => item.value) : [],
                type: Array.isArray(formData.recipeTypes) ? formData.recipeTypes.map((item) => item.value) : [],
                nutritionFacts: {
                    calories: {
                        num: calories,
                        unit: "dish",
                    },
                    cholesterol: {
                        num: cholesterol,
                        unit: "dish",
                    },
                    protein: {
                        num: protein,
                        unit: "dish",
                    },
                    caffeine: {
                        num: caffeine,
                        unit: "dish",
                    },
                },
                goodFor: Array.isArray(formData.goodFor) ? formData.goodFor.map((item) => item.value) : [],
                notGoodFor: Array.isArray(formData.notGoodFor) ? formData.notGoodFor.map((item) => item.value) : [],
                steps: Array.isArray(formData.steps) ? formData.steps.map((item) => item) : [],
                prepare: formData.prepare,
                ingredients: Array.isArray(formData.ingredients) ? formData.ingredients.map((item) => ({ id: item.id.value, quantity: item.quantity })) : [],
                timing: formData.steps.reduce((total, step) => total + parseInt(step.timing || 0), 0),
                budgetPerUnit: {
                    budget: budgetperunit,
                    unit: "dish",
                },
                userOwner: userID,
            };

            setRecipe(newRecipe);

            await axios.post(URI + "/admin/recipes/create", newRecipe, {
                headers: { authorization: cookies.access_token },
            });

            alert("Món ăn đã được tạo!");
            console.log("Recipe Created:", newRecipe);

            // Reset the form
            setRecipe({
                name: "",
                description: "",
                imageUrl: "",
                region: [],
                type: [],
                nutritionFacts: {},
                goodFor: [],
                notGoodFor: [],
                steps: [],
                prepare: "",
                ingredients: [],
                timing: 0,
                budgetPerUnit: {},
                userOwner: ""
            });
            navigate("/recipes-list");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container py-4 flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-lg">
                <h2 className="p-2 uppercase text-gray-700 text-center font-bold md:text-3xl sm:text-2xl">Tạo Món ăn mới</h2>
                <div className="mb-2 flex flex-row gap-6">
                    <div className='BasicInfo p-2 border rounded'>
                        <Typography color="gray" className="p-1 font-normal uppercase">
                            Cơ bản
                        </Typography>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="name"
                                defaultValue=""
                                render={({ field }) => <Input {...field} size="lg" label="Tên Món ăn" id="name" name="name" color="deep-orange" />}
                            />
                        </div>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="description"
                                defaultValue=""
                                render={({ field }) => <Textarea {...field} size="lg" label="Mô tả" id="description" name="description" color="deep-orange" />}
                            />
                        </div>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="imageurl"
                                defaultValue=""
                                render={({ field }) => <Input {...field} size="lg" label="Link Ảnh" id="imageurl" name="imageurl" color="deep-orange" />}
                            />
                        </div>
                    </div>
                    <div className='SelectSearch p-2 border rounded'>
                        <Typography color="gray" className="p-1 font-normal uppercase">
                            Phân loại
                        </Typography>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="recipeTypes"
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={optionsRecipeTypes}
                                        styles={customStyles}
                                        placeholder="Phân loại Món ăn"
                                        isMulti
                                        isClearable
                                        isSearchable
                                    // components={{ Input }}
                                    />
                                )}
                                color="deep-orange"
                            />
                        </div>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="goodfor"
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={optionsHealths}
                                        styles={customStyles}
                                        placeholder="Tốt cho người"
                                        isMulti
                                        isClearable
                                        isSearchable
                                    // components={{ Input }}
                                    />
                                )}
                            />
                        </div>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="notgoodfor"
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={optionsHealths}
                                        styles={customStyles}
                                        placeholder="Không tốt cho người"
                                        isMulti
                                        isClearable
                                        isSearchable
                                    // components={{ Input }}
                                    />
                                )}
                            />
                        </div>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="region"
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={optionsRegions}
                                        styles={customStyles}
                                        placeholder="Nguồn gốc"
                                        isMulti
                                        isClearable
                                        isSearchable
                                    // components={{ Input }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className='Ingredients p-2 border rounded'>
                        <Typography color="gray" className="p-1 font-normal uppercase">
                            Nguyên liệu
                        </Typography>
                        <div className="form-group p-2 text-center">
                            {/* Ingredient inputs */}
                            <table>
                                <tbody>
                                    {ingredients.map((ingredient, index) => (
                                        <tr key={index}>
                                            <td className="pb-1">
                                                <Controller
                                                    control={control}
                                                    name={`ingredients[${index}].id`}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={optionsIngredients}
                                                            styles={customStyles}
                                                            placeholder="Chọn nguyên liệu"
                                                            isClearable
                                                            isSearchable
                                                        />
                                                    )}
                                                />
                                            </td>
                                            <td className="pb-1">
                                                <Controller
                                                    control={control}
                                                    name={`ingredients[${index}].quantity`}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            size="md"
                                                            label="Lượng (gr/ml)"
                                                            id={`quantity_${index}`}
                                                            name={`quantity_${index}`}
                                                            color="deep-orange"
                                                        />
                                                    )}
                                                />
                                            </td>
                                            <td className="pb-1">
                                                {index > 0 && (
                                                    <Button type="button" onClick={() => handleRemoveIngredient(index)} className="bg-deep-orange-500 p-2">
                                                        <AiOutlineDelete size={20} />
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                            {/* Add ingredient button */}
                            <Button type="button" onClick={handleAddIngredient} className="bg-deep-orange-500" fullWidth>
                                Thêm nguyên liệu
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-6">
                    <div className='Prepare p-2 border flex-grow rounded'>
                        <Typography color="gray" className="p-1 font-normal uppercase">
                            Chuẩn bị
                        </Typography>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="prepare"
                                defaultValue=""
                                render={({ field }) => <Textarea {...field} size="lg" label="Chuẩn bị" id="prepare" name="prepare" color="deep-orange" />}
                            />
                        </div>
                    </div>
                    <div className='Steps p-2 border rounded'>
                        <Typography color="gray" className="p-1 font-normal uppercase">
                            Hướng dẫn
                        </Typography>
                        <div className="form-group p-2 text-center">
                            {/* Step inputs */}
                            <table>
                                <tbody>
                                    {steps.map((step, index) => (
                                        <tr key={index}>
                                            <td className="pb-1">
                                                <Controller
                                                    control={control}
                                                    name={`steps[${index}].step`}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            size="md"
                                                            label={`Bước ${index + 1}`}
                                                            id={`step_${index}`}
                                                            name={`step_${index}`}
                                                            color="deep-orange"
                                                        />
                                                    )}
                                                />
                                            </td>
                                            <td className="pb-1">
                                                <Controller
                                                    control={control}
                                                    name={`steps[${index}].timing`}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            size="md"
                                                            label="Thời gian (s)"
                                                            id={`timing_${index}`}
                                                            name={`timing_${index}`}
                                                            color="deep-orange"
                                                        />
                                                    )}
                                                />
                                            </td>
                                            <td className="pb-1">
                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleRemoveStep(index)}
                                                        className="bg-deep-orange-500 p-2"
                                                    >
                                                        <AiOutlineDelete size={20} />
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Add step button */}
                            <Button type="button" onClick={handleAddStep} className="bg-deep-orange-500" fullWidth>
                                Thêm bước
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="form-group p-2 text-center">
                    <Button type="submit" className="mt-4 bg-deep-orange-500" fullWidth>
                        Tạo
                    </Button>
                </div>
            </form>
        </div>
    );
};
