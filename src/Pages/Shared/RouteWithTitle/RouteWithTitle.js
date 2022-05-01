import React from 'react';
import { Helmet } from 'react-helmet-async';

const RouteWithTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{title} - Shakshor Car Services</title>
        </Helmet>
    );
};

export default RouteWithTitle;