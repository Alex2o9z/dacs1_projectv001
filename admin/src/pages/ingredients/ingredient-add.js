import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Typography, Input, Textarea, Button } from "@material-tailwind/react";
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useGetUserID } from '../../hooks/useGetUserID.js';

const URI = process.env.REACT_APP_SERVER_URL;

export const IngredientAdd = () => {
	const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
	const navigate = useNavigate();
    const [ingredient, setIngredient] = useState({
        name: "",
        description: "",
        imageUrl: "",
        nutritionFacts: {},
        type: [],
        goodFor: [],
        notGoodFor: [],
        region: [],
        costPerUnit: {},
        userOwner: ""
    });

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URI + "/admin/ingredients/create");
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const { control, handleSubmit } = useForm();

    const optionsIngredientTypes = data.ingredientTypes?.map((ingredientType) => ({
        value: ingredientType._id,
        label: ingredientType.name,
    })) || [];

    const optionsHealths = data.healths?.map((health) => ({
        value: health._id,
        label: health.name,
    })) || [];

    const optionsRegions = data.regions?.map((region) => ({
        value: region._id,
        label: region.name,
    })) || [];

    const customStyles = {
        menu: (provided) => ({
          ...provided,
          borderColor: '#ed8936', // Màu viền deep-orange-500 cho phần tìm kiếm
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
            backgroundColor: state.isFocused ? '#ed8936' : '#f3f4f6', // Đổi màu khi hover vào tùy chọn
          },
        }),
        // placeholder: (provided) => ({
        //   ...provided,
        //   color: '#ed8936', // Màu deep-orange-500 cho phần tìm kiếm
        // }),
    };
    
    useEffect(() => {
        if (ingredient) {
          console.log("Updated Ingredient:", ingredient);
        }
      }, [ingredient]);
    
      const onSubmit = async (formData) => {
        try {
            const newIngredient = {
                name: formData.name,
                description: formData.description,
                imageUrl: formData.imageurl,
                nutritionFacts: {
                    calories: {
                        num: parseFloat(formData.calories),
                        unit: "gram",
                    },
                    cholesterol: {
                        num: parseFloat(formData.cholesterol),
                        unit: "gram",
                    },
                    protein: {
                        num: parseFloat(formData.protein),
                        unit: "gram",
                    },
                    caffeine: {
                        num: parseFloat(formData.caffeine),
                        unit: "gram",
                    },
                },
                type: Array.isArray(formData.ingredientTypes) ? formData.ingredientTypes.map((item) => item.value) : [],
                goodFor: Array.isArray(formData.goodFor) ? formData.goodFor.map((item) => item.value) : [],
                notGoodFor: Array.isArray(formData.notGoodFor) ? formData.notGoodFor.map((item) => item.value) : [],
                region: Array.isArray(formData.region) ? formData.region.map((item) => item.value) : [],
                costPerUnit: {
                    cost: parseFloat(formData.costperunit),
                    unit: "gram",
                },
                userOwner: userID,
            };
    
            setIngredient(newIngredient);
    
            await axios.post(URI + "/admin/ingredients/create", newIngredient, {
                headers: { authorization: cookies.access_token },
            });
    
            alert("Nguyên liệu đã được tạo!");
            console.log("Ingredient Created:", newIngredient);
            
            // Reset the form
            setIngredient({
                name: "",
                description: "",
                imageUrl: "",
                nutritionFacts: {},
                type: [],
                goodFor: [],
                notGoodFor: [],
                region: [],
                costPerUnit: {},
                userOwner: ""
            });
            navigate("/ingredients-list");
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <div className="auth-container py-4 flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-lg">
                <h2 className="p-2 uppercase text-gray-700 text-center font-bold md:text-3xl sm:text-2xl">Tạo nguyên liệu mới</h2>
                <div className="flex flex-row gap-6">
                    <div className='BasicInfo'>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="name"
                                defaultValue=""
                                render={({ field }) => <Input {...field} size="lg" label="Tên nguyên liệu" id="name" name="name" color="deep-orange" />}
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
                    <div className='SelectSearch'>
                        <div className="form-group p-2 text-center">
                            <Controller
                                control={control}
                                name="ingredientTypes"
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={optionsIngredientTypes}
                                        styles={customStyles}
                                        placeholder="Phân loại nguyên liệu"
                                        isMulti
                                        isClearable
                                        isSearchable
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
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className='NutritionAndCost'>
                        <div className='border rounded-lg'>
                            <Typography color="gray" className="m-1 font-normal">
                                Giá trị dinh dưỡng:
                            </Typography>
                            <div className="form-group p-2 flex justify-between">
                                <div className='mx-1'>
                                    <Controller
                                        control={control}
                                        name="calories"
                                        defaultValue=""
                                        rules={{ required: true, pattern: /^[0-9]*.[0-9]*$/ }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="Calories/gram"
                                                error={!!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)}
                                                helperText={
                                                    !!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)
                                                        ? 'Vui lòng chỉ nhập số'
                                                        : null
                                                }
                                                color="deep-orange"
                                            />
                                        )}
                                    />
                                </div>
                                <div className='mx-1'>
                                    <Controller
                                        control={control}
                                        name="cholesterol"
                                        defaultValue=""
                                        rules={{ required: true, pattern: /^[0-9]*.[0-9]*$/ }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="Cholesterol/gram"
                                                error={!!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)}
                                                helperText={
                                                    !!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)
                                                        ? 'Vui lòng chỉ nhập số'
                                                        : null
                                                }
                                                color="deep-orange"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="form-group p-2 flex justify-between">
                                <div className='mx-1'>
                                    <Controller
                                        control={control}
                                        name="protein"
                                        defaultValue=""
                                        rules={{ required: true, pattern: /^[0-9]*.[0-9]*$/ }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="Protein/gram"
                                                error={!!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)}
                                                helperText={
                                                    !!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)
                                                        ? 'Vui lòng chỉ nhập số'
                                                        : null
                                                }
                                                color="deep-orange"
                                            />
                                        )}
                                    />
                                </div>
                                <div className='mx-1'>
                                    <Controller
                                        control={control}
                                        name="caffeine"
                                        defaultValue=""
                                        rules={{ required: true, pattern: /^[0-9]*.[0-9]*$/ }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                label="Caffeine/gram"
                                                error={!!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)}
                                                helperText={
                                                    !!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)
                                                        ? 'Vui lòng chỉ nhập số'
                                                        : null
                                                }
                                                color="deep-orange"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                        <div className="form-group p-2 flex justify-between">
                                <Controller
                                    control={control}
                                    name="costperunit"
                                    defaultValue=""
                                    rules={{ required: true, pattern: /^[0-9]*.[0-9]*$/ }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            label="Chi phí / gram"
                                            error={!!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)}
                                            helperText={
                                                !!field.value && !/^[0-9]*.[0-9]*$/.test(field.value)
                                                    ? 'Vui lòng chỉ nhập số'
                                                    : null
                                            }
                                            color="deep-orange"
                                        />
                                    )}
                                />
                            </div>
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
