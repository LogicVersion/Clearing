
  const user = [
        { firstname: "Mohammad", lastname: "Noushad", age: 22 },
        { firstname: "Aniket", lastname: "Bhalla", age: 45 },
        { firstname: "Bidhi", lastname: "Chand", age: 21 },
        { firstname: "Saif", lastname: "Siddiqi", age: 67 },
      ];

      const output = user.reduce((acc, current) => {

        if(current.age < 30){
            acc.push(current.firstname);
        }

        return acc;

      }, []);

      console.log(output);
