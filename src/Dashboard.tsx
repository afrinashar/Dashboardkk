 
 import { fluentButton, provideFluentDesignSystem } from "https://unpkg.com/@fluentui/web-components@2.0.0";
 const Dashboard = () => {
    provideFluentDesignSystem().register(fluentButton());
  return (
    <>Dashboard
     </>
  )
}

export default Dashboard