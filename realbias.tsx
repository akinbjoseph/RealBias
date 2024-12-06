import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, User, BarChart3, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// App component with routing logic
const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userInputs, setUserInputs] = useState({
    region: '',
    age: '',
    ethnicity: ''
  });
  
  const renderPage = () => {
    switch(currentPage) {
      case 1: return <LandingPage onNext={() => setCurrentPage(2)} />;
      case 2: return <CheckRiskPage 
                      userInputs={userInputs} 
                      setUserInputs={setUserInputs} 
                      onNext={() => setCurrentPage(3)} 
                    />;
      case 3: return <AnalyzingPage onNext={() => setCurrentPage(4)} />;
      case 4: return <ResultsPage userInputs={userInputs} />;
      default: return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {renderPage()}
      </div>
    </div>
  );
};

// Landing Page
const LandingPage = ({ onNext }) => (
  <Card className="p-8 space-y-8">
    <h1 className="text-3xl font-bold">RealBias: How Accurate Is Your Oximeter Reading?</h1>
    
    <div className="space-y-4">
      <p className="text-lg">
        A pulse oximeter—that small device clipped to your finger at the 
        hospital—might be less accurate depending on your skin color.
      </p>
      <p className="text-lg">
        Studies show these devices are three times more likely to miss 
        dangerously low oxygen levels in Black patients compared to 
        White patients.
      </p>
    </div>

    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Are You Getting the Right Reading?</h2>
      <p className="text-lg">
        We analyzed nearly 50,000 pulse oximeter measurements from hospitals 
        across the US, comparing device readings to actual blood oxygen levels. 
        Our findings revealed significant accuracy gaps across different 
        demographic groups.
      </p>
    </div>

    <Button 
      onClick={onNext}
      className="w-full text-lg py-6"
    >
      Check Your Risk
      <ArrowRight className="ml-2" />
    </Button>
  </Card>
);

// Check Risk Page
const CheckRiskPage = ({ userInputs, setUserInputs, onNext }) => {
  const regions = ['Northeast', 'Midwest', 'South', 'West'];
  const ethnicities = ['White', 'Black', 'Hispanic', 'Asian', 'American Indian / Alaska Native'];

  return (
    <Card className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Check Your Risk</h1>
      
      <p className="text-lg">
        Find out how likely you are to get an inaccurate reading based on 
        real patient data from your background:
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center text-lg gap-2">
            <MapPin className="text-pink-500" />
            Region
          </label>
          <select 
            className="w-full p-3 border rounded-lg"
            value={userInputs.region}
            onChange={(e) => setUserInputs({...userInputs, region: e.target.value})}
          >
            <option value="">Select your location in the US</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-lg gap-2">
            <User className="text-purple-500" />
            Age
          </label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full p-3 border rounded-lg"
            value={userInputs.age}
            onChange={(e) => setUserInputs({...userInputs, age: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-lg gap-2">
            <BarChart3 className="text-blue-500" />
            Race/Ethnicity
          </label>
          <select 
            className="w-full p-3 border rounded-lg"
            value={userInputs.ethnicity}
            onChange={(e) => setUserInputs({...userInputs, ethnicity: e.target.value})}
          >
            <option value="">Select your background</option>
            {ethnicities.map(ethnicity => (
              <option key={ethnicity} value={ethnicity}>{ethnicity}</option>
            ))}
          </select>
        </div>
      </div>

      <Button 
        onClick={onNext}
        className="w-full text-lg py-6"
        disabled={!userInputs.region || !userInputs.age || !userInputs.ethnicity}
      >
        Let's go
        <ArrowRight className="ml-2" />
      </Button>
    </Card>
  );
};

// Analyzing Page
const AnalyzingPage = ({ onNext }) => {
  React.useEffect(() => {
    const timer = setTimeout(onNext, 2000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <Card className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Analyzing Your Risk</h1>
      
      <p className="text-lg">
        Using data from the BOLD study, we'll show you the percentage of 
        incorrect readings for people with similar characteristics to you, 
        and what this means for your medical care.
      </p>

      <div className="flex justify-center p-8">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    </Card>
  );
};

// Results Page
const ResultsPage = ({ userInputs }) => {
  // Sample data - in real app, calculate based on userInputs
  const errorRate = 12; // Sample error rate
  const comparisonData = [
    { group: "White", error: 3, error2: 5 },
    { group: "Hispanic", error: 8, error2: 11 },
    { group: "Black", error: 15, error2: 18 }
  ];

  return (
    <Card className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Your Risk</h1>
      
      <div className="space-y-4">
        <p className="text-xl">
          People with your background have a {errorRate}% chance of 
          getting an error for any given oximeter reading.
        </p>

        <p className="text-lg">
          Given below are the error rates for people from 
          other racial demographics
        </p>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="error" fill="#93c5fd" name="Minimum Error" />
              <Bar dataKey="error2" fill="#3b82f6" name="Maximum Error" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Button 
        variant="outline"
        className="w-full text-lg py-6"
        onClick={() => window.location.href = '#why-racial-bias'}
      >
        Why is there a racial bias?
        <ArrowRight className="ml-2" />
      </Button>
    </Card>
  );
};

export default App;
